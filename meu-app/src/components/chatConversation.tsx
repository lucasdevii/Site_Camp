import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4001");

type MessageType = { id: number; conversation: string; createdAt?: string };
function ChatConversation() {
  const [conversationChat, setConversationChat] = useState<MessageType[]>([]);
  useEffect(() => {
    const onChatHistory = (message: MessageType[]) => {
      setConversationChat(message);
    };
    socket.on("ChatHistory", onChatHistory);
    return () => {
      socket.off("ChatHistory", onChatHistory);
    };
  }, []);
  return conversationChat.map((obj) => {
    <div className="">
      <div>{obj.conversation}</div>
    </div>;
  });
}
export default ChatConversation;
