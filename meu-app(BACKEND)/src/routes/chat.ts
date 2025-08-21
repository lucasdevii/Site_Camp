import { App, prisma } from "../App";

interface SendMessageFrontEmitType {
  idUser: number;
  message: string;
  chatRoomId: number;
}

const CHAVE_HASH = "HASHJWTDECODE";

App.post("/AddMessage", async (req, res) => {
  const { message, chatRoomId, idUser }: SendMessageFrontEmitType = req.body;
  if (message.trim() !== "" && message.length < 4000) {
    const result = await prisma.chatTalks.create({
      data: {
        authorId: idUser,
        conversation: message,
        chatRoomId: chatRoomId,
      },
      select: {
        conversation: true,
      },
    });
    result
      ? res.status(200).json({ isValid: true })
      : res
          .status(401)
          .json({ isValid: false, message: "algum erro na criação do prisma" });
  }
  if (message.trim() == "") {
    return res
      .status(401)
      .json({ isValid: false, message: "Mensagem sem conteúdo" });
  }
  if (message.length >= 4000) {
    res
      .status(401)
      .json({ isValid: false, message: "Número de caractéres ultrapassados" });
  }
});
App.post("/Friends/List", async (req, res) => {
  try {
    const codeInvite: string = req.body.code;
    const showFriends = await prisma.friends.findMany({
      where: {
        OR: [
          {
            //DEPOIS ALTERAR NA TABELA PARA STRING O ID DO PRIMEIRO E SEGUNDO PLAYER
            idFirstPlayer: Number(codeInvite),
          },
          { idSecondPlayer: Number(codeInvite) },
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
      friend.requester.code === codeInvite ? friend.receiver : friend.requester;
    });
    res
      .status(200)
      .json({ friends: arrayFriends, message: "Amigos listados com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Falha no servidor" });
  }
});
