import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const PORT = 4001;

const CHAVE_HASH = "HASHJWTDECODE";

type UserTypes = {
  name: string;
  email: string;
  password: string;
};

const App = express();
App.use(cors({ origin: "http://localhost:4000", credentials: true }));
App.use(express.json());
App.use(cookieParser());

App.post("/SignUp", async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      jwt.verify(token, CHAVE_HASH);
      return res
        .status(401)
        .json({ success: false, message: "Usuário já está logado." });
    } catch {
      // token inválido ou expirado, pode continuar
    }
  }

  const { name, email, password } = req.body;

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
    // Verifica se email já está cadastrado
    const existEmail = await prisma.user.findUnique({
      where: { email: emailTrim },
      select: { email: true },
    });

    if (existEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(passwordTrim, 10);

    await prisma.user.create({
      data: {
        name: nameTrim,
        email: emailTrim,
        password: hashedPassword,
      },
    });

    // Cria token após cadastro
    const newToken = jwt.sign({ email: emailTrim }, CHAVE_HASH);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "Cadastro bem-sucedido." });
  } catch (error) {
    console.error("Falha ao cadastrar usuário:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao cadastrar o usuário." });
  }
});

// Rota de Login
App.post("/Login", async (req, res) => {
  const token = req.cookies.token;

  // Se já tem token válido, bloqueia login (usuário já logado)
  if (token) {
    try {
      jwt.verify(token, CHAVE_HASH);
      return res
        .status(401)
        .json({ success: false, message: "Usuário já está logado." });
    } catch {
      //   token inválido ou expirado, pode continuar
    }
  }

  const { email, password } = req.body;

  const emailTrim = email?.trim() || "";
  const passwordTrim = password?.trim() || "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
  const domain = emailTrim.split("@")[1];

  const isValid =
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
    const user = await prisma.user.findUnique({
      where: { email: emailTrim },
      select: { password: true },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email ou senha incorretos." });
    }

    const passwordConfirmed = await bcrypt.compare(passwordTrim, user.password);

    if (!passwordConfirmed) {
      return res
        .status(400)
        .json({ success: false, message: "Email ou senha incorretos." });
    }

    const newToken = jwt.sign({ email: emailTrim }, CHAVE_HASH);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login realizado com sucesso." });
  } catch (error) {
    console.error("Falha ao logar usuário:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao logar o usuário." });
  }
});
// Verificação de usuário
App.post("/Cadaster/Verifycation", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Usuário não está cadastrado/logado.",
    });
  }

  try {
    const payload = jwt.verify(token, CHAVE_HASH) as { email: string };

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { email: true, name: true, details: true },
    });

    if (user?.name && user?.email) {
      return res.status(200).json({
        success: true,
        message: "Usuário autenticado com sucesso.",
        name: user.name,
        description: user.details,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Token adulterado... excluindo token.",
      });
    }
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
});

App.post("/Desconnect_Account", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout realizado com sucesso." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao deslogar." });
  }
});

// Inicialização do servidor
App.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
