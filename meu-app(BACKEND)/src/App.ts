import rateLimit from "express-rate-limit";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";

export const prisma = new PrismaClient();

export const App = express();

const limiter = rateLimit({
  windowMs: 10000,
  max: 100,
  message: "Muitas requisições vindas desse IP, tente novamente mais tarde",
});

App.use(limiter);
App.use(express.static("public"));
App.use(cors({ origin: "http://localhost:4000", credentials: true }));
App.use(express.json());
App.use(cookieParser());
