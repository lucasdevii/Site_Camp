import { useEffect, useState } from "react";
import SideBar from "../components/sideContacts";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4001");

function Chats() {
  type Friends = {
    id: number;
    name: string;
    isOnline: boolean;
    photo?: File;
  };
  const [friendsList, setFriendsList] = useState<Friends[]>([]);
  const [isClickedChat, setClickedChat] = useState<boolean>(false);
  const [nameChat, setNameChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");

  //async function ListFriends() {}

  useEffect(() => {
    setFriendsList([
      { id: 1, name: "Geo", isOnline: true },
      { id: 2, name: "Gorila", isOnline: false },
      { id: 3, name: "Ana", isOnline: true },
      { id: 4, name: "Carlos", isOnline: false },
    ]);
  }, []);

  function SendMessage() {
    if (messageInput.trim() !== "" || messageInput.length < 4000) {
      return axios.post(
        "http://localhost:4001/AddMessage",
        { message: messageInput },
        { withCredentials: true }
      );
    }
    if (messageInput.trim() == "") {
      return;
    }
    if (messageInput.length >= 4000) {
      console.log("Número de caractéres ultrapassados");
    }
  }
  return (
    <div className="flex h-full">
      <div className="">
        <SideBar
          friendsList={friendsList}
          setClickedChat={setClickedChat}
          setNameChat={setNameChat}
        />
      </div>
      <div className=" h-full w-full ml-80 flex flex-col">
        {!isClickedChat ? (
          <div></div>
        ) : (
          <div className="h-screen flex flex-col justify-between">
            <div className="my-12 py-4 px-3 bg-[#3e362e] flex ">
              <div className="bg-transparent">
                <div className="bg-transparent">
                  <div className=" text-lg font-bold bg-transparent">
                    <h1 className="bg-transparent">{nameChat}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#3e362e] my-4 h-12 w-full mx-3 rounded-xl px-2 flex items-center space-x-2">
                <input
                  placeholder="Message"
                  className="h-full w-full bg-transparent focus:outline-none"
                  type="text"
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                  }}
                />
                <div className="bg-transparent cursor-pointer">
                  <img
                    className="invert bg-transparent w-7"
                    src="send_icon.svg"
                    alt="send"
                    onClick={SendMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Chats;
