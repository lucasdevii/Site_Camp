import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { App, prisma } from "../App";
import { Prisma } from "@prisma/client";
const CHAVE_HASH = process.env.SenhaJWT as string;
App.post("/Friends/Receives", async (req, res) => {
  try {
    const codeUser = req.body.code;
    const exists = await prisma.user.findUnique({ where: { code: codeUser } });
    if (!exists)
      return res
        .status(200)
        .json({ message: "Usuário inexistente", success: true, receives: [] });

    const receivesRaw = await prisma.friendsStatus.findMany({
      where: { receiver: { code: codeUser }, status: "PENDING" },
      select: {
        requester: { select: { name: true, code: true } },
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const receives = receivesRaw.map((r) => ({
      name: r.requester.name,
      code: r.requester.code,
      createdAt: r.createdAt,
    }));
    return res.status(200).json({
      message: "Receives capturadas",
      success: true,
      receives,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
});

App.post("/Friends/List", async (req, res) => {
  try {
    const codeInvite: string = req.body.code;
    const showFriends = await prisma.friendsStatus.findMany({
      where: {
        OR: [
          {
            requester: { code: codeInvite },
          },
          { receiver: { code: codeInvite } },
        ],
        status: "ACCEPTED",
      },
      include: {
        requester: { select: { name: true, code: true } },
        receiver: { select: { name: true, code: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    const arrayFriends = showFriends.map((friend) => {
      return friend.requester.code === codeInvite
        ? friend.receiver
        : friend.requester;
    });
    res.status(200).json({
      friends: arrayFriends,
      message: "Amigos listados com sucesso!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Falha no servidor", success: false });
  }
});
App.post("/Friends/Invite", async (req, res) => {
  try {
    const codeInviteEnvied: string = req.body.codeInviteEnvied;
    const codeinviter: string = req.body.codeInviter;
    console.log(codeInviteEnvied, codeinviter);
    if (codeInviteEnvied == codeinviter) {
      return res.status(400).json({
        success: false,
        message: "Você não pode enviar um convire para si mesmo",
      });
    }
    if (codeInviteEnvied.trim().length == 36) {
      const userCodeBanks = await prisma.user.findUnique({
        where: { code: codeInviteEnvied },
        select: {
          name: true,
        },
      });
      if (userCodeBanks) {
        console.log("o caba existe");
        const isRelationed = await prisma.friendsStatus.findFirst({
          where: {
            OR: [
              {
                requester: { code: codeinviter },
                receiver: { code: codeInviteEnvied },
              },
              {
                requester: { code: codeInviteEnvied },
                receiver: { code: codeinviter },
              },
            ],
          },
        });
        if (!isRelationed) {
          console.log("Não estão relacionados");
          await prisma.friendsStatus.create({
            data: {
              requester: { connect: { code: codeinviter } },
              receiver: { connect: { code: codeInviteEnvied } },
              status: "PENDING",
            },
          });
          console.log("pedido enviado para: ", userCodeBanks.name);
          return res
            .status(201)
            .json({ success: true, message: "Pedido enviado!" });
        } else {
          console.log("Vc já recebeu ou fez um pedido a esse usuário");
          return res.status(400).json({
            success: false,
            message: "Vc já recebeu ou fez um pedido a esse usuário",
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "O usuário não existe" });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "O codigo enviado, precisa ter 36 digitos",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro interno" });
  }
});
App.post("/Friends/Requests", async (req, res) => {
  try {
    const codeUser = req.body.code;
    const exists = await prisma.user.findUnique({ where: { code: codeUser } });
    if (!exists)
      return res
        .status(200)
        .json({ message: "Usuário inexistente", success: true, requests: [] });

    const requestsRaw = await prisma.friendsStatus.findMany({
      where: { requester: { code: codeUser }, status: "PENDING" },
      select: { receiver: { select: { name: true, code: true } } },
      orderBy: { createdAt: "desc" },
    });

    const requests = requestsRaw.map((r) => r.receiver);
    return res
      .status(200)
      .json({ message: "Requests capturadas", success: true, requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
});
//OPÇOES DE O QUE FAZER COM OS PEDIDOS DE AMIZADE -RECEIVER-
App.delete("/Friends/Reject_Receiver", async (req, res) => {
  try {
    const {
      codeReceiver,
      codeUser,
    }: { codeReceiver: string; codeUser: string } = req.body;
    console.log(codeReceiver, codeUser);
    const token: string | undefined = req.cookies.token;
    if (token) {
      const payload = jwt.verify(token, CHAVE_HASH);
      if (typeof payload === "string") {
        return res
          .status(400)
          .json({ success: false, message: "Token inválido" });
      }
      const email = payload.email;
      const userCodeBank = await prisma.user.findUnique({
        where: { email: email },
        select: { code: true },
      });
      if (userCodeBank?.code === codeUser) {
        const isRelationed = await prisma.friendsStatus.deleteMany({
          where: {
            requester: { code: codeReceiver },
            receiver: { code: codeUser },
            status: "PENDING",
          },
        });

        if (isRelationed) {
          return res
            .status(204)
            .json({ message: "Pedido rejeitado", success: true });
        } else {
          return res.status(404).json({
            message: "Usuários não estão relacionados",
            success: false,
          });
        }
      }
    } else {
      console.log("Usuário não cadastrado");
      return res
        .status(400)
        .json({ success: false, message: "Usuário não cadastrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
});
App.post("/Friends/Accept_Receiver", async (req, res) => {
  const codeUser;
  const;
});
