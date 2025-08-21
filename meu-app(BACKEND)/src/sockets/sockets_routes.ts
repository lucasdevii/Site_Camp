import { App, prisma } from "../App";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(App);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4000",
  },
});

interface ChatTypes {
  idChat: number;
  name: string;
}

io.on("connect", (socket) => {
  console.log("novo cliente conectado: ", socket.id);
  //É a rota para saber quando tem notificação
  // socket.on("joinInFriendsChats", ({ chats }: FriendsChatsArrayType) => {
  //   socket.join(`Chat_Geral`);
  //   console.log("O usuario se conectou no chat geral de notificações");
  // });
  //É a rota para pedir as mensagens e receber em tempo real dentro de um chat em especifico
  socket.on("joinInChat", async (idUser: ChatTypes) => {
    socket.join(`Chat_${idUser.name}`);
    console.log("O usuário se conectou no cabra: ", idUser.name);
    //Quando o usuario aceitar o pedido de amizade, essa ligação no chat será criado
    const arrayConversations = await prisma.chatInfos.findMany({
      where: {},
      select: {
        id: true,
      },
    });
    socket.emit("ChatHistory", arrayConversations);
  });
  socket.on("disconnect", () => {});
});
