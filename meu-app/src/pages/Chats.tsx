import { useContext, useEffect, useState } from "react";
import SideBar from "../components/sideContacts";
import axios from "axios";
import { LoginContext } from "../Context/context_login";

interface ContextType {
  nameUser: string;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  description: string;
  codeInvite: string;
}
type FriendsObjType = {
  code: string | null;
  name: string;
  isOnline: boolean;
};
function Chats() {
  const [friendsList, setFriendsList] = useState<FriendsObjType[]>([]);
  const [isClickedChat, setClickedChat] = useState<boolean>(false);
  const [nameChat, setNameChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");

  const { codeInvite }: ContextType = useContext(LoginContext)!;

  useEffect(() => {
    axios
      .post("Friends/List", { code: codeInvite })
      .then((res) => {
        setFriendsList(res.data.friends);
      })
      .catch((error) => {
        console.log("Erro no servidor", error);
      });
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
          <div className="h-screen flex flex-col justify-between ">
            <div className="my-12 py-4 px-3 bg-[#3e362e] flex ">
              <div className="bg-transparent">
                <div className="bg-transparent">
                  <div className=" text-lg font-bold bg-transparent">
                    <h1 className="bg-transparent">{nameChat}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center border-t border-stone-600">
              <div className="bg-[#3e362e] my-3 h-12 w-full mx-3 rounded-xl px-2 flex items-center space-x-2">
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
