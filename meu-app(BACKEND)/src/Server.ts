import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const PORT = 4001;

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "seuemail@gmail.com",
//     pass: "sua_senha_ou_app_password",
//   },
// });

// async function EmailEnvied(email: string) {
//   try {
//     await transporter.sendMail({
//       from: '"Seu Nome" <seuemail@gmail.com>',
//       to: email,
//       // subject,
//       // text,
//       // html,
//     });
//     console.log("Email enviado com sucesso!");
//   } catch (error) {
//     console.error("Erro ao enviar email:", error);
//   }
// }
//TIPOS
type UserTypes = {
  name: string;
  email: string;
  password: string;
};

const App = express();
App.use(cors({ origin: "http://localhost:5173", credentials: true }));
App.use(express.json());
App.use(cookieParser());
//CADASTRO/LOGIN E VERIFICAÇÃO DE LOGIN
App.post("/SignUp", async (req, res) => {
  const { name, password, email } = req.body;

  const emailTrim = email?.trim() || "";
  const nameTrim = name?.trim() || "";
  const passwordTrim = password?.trim() || "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
  const domain = emailTrim.split("@")[1];

  const isValid =
    nameTrim.length >= 8 &&
    passwordTrim.length >= 8 &&
    emailTrim.length >= 6 &&
    emailRegex.test(emailTrim) &&
    allowedDomains.includes(domain);

  if (!isValid) {
    return res
      .status(400)
      .json({ success: false, message: "Dados inválidos." });
  }

  try {
    const hashedPassword = await bcrypt.hash(passwordTrim, 10);

    const user = await prisma.user.create({
      data: {
        name: nameTrim,
        email: emailTrim,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email: emailTrim }, "chavehash");

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Cadastro bem-sucedido." });
  } catch (error) {
    console.log("falha ao cadastrar usuário", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao cadastrar o usuário." });
  }
});

App.post("/Cadaster/Verifycation", async (req, res) => {
  const token: string = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Usuário não está cadastrado/logado.",
    });
  }

  try {
    const payload = jwt.verify(token, "chavehash") as { email: string };

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { email: true, name: true },
    });

    if (user?.name && user?.email) {
      return res.status(200).json({
        success: true,
        message: "Usuário autenticado com sucesso.",
        name: user.name,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Token adulterado... excluindo token.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
});

//INICIALIZAÇÃO DO SERVER
App.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
