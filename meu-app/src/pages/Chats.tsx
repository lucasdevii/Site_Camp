import { useEffect, useState } from "react";
import SideBar from "../components/sideContacts";

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

  //async function ListFriends() {}

  useEffect(() => {
    setFriendsList([
      { id: 1, name: "Geo", isOnline: true },
      { id: 2, name: "Gorila", isOnline: false },
      { id: 3, name: "Ana", isOnline: true },
      { id: 4, name: "Carlos", isOnline: false },
    ]);
  }, []);

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
            <div className="h-16 flex justify-center">
              <input
                type="text"
                className="bg-[#3e362e] h-10 w-5/6 rounded-2xl px-2"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Chats;
