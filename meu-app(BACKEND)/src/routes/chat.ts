import { App, prisma } from "../App";

// interface SendMessageFrontEmitType {
//   idUser: string;
//   message: string;
//   chatRoomId: string;
// }

const CHAVE_HASH = "HASHJWTDECODE";

// App.post("/AddMessage", async (req, res) => {
//   try {
//     const { message, chatRoomId, idUser }: SendMessageFrontEmitType = req.body;
//     if (message.trim() !== "" && message.length < 4000) {
//       const result = await prisma.chatTalks.create({
//         data: {
//           authorId: idUser,
//           conversation: message,
//           chatRoomId: chatRoomId,
//         },
//         select: {
//           conversation: true,
//         },
//       });
//       result
//         ? res.status(200).json({ isValid: true })
//         : res.status(401).json({
//             isValid: false,
//             message: "algum erro na criação do prisma",
//           });
//     }
//     if (message.trim() == "") {
//       return res
//         .status(401)
//         .json({ isValid: false, message: "Mensagem sem conteúdo" });
//     }
//     if (message.length >= 4000) {
//       res.status(401).json({
//         isValid: false,
//         message: "Número de caractéres ultrapassados",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
