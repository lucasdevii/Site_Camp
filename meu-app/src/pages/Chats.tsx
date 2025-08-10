import { useEffect, useState } from "react";
import SideBar from "../components/sideContacts";
import axios from "axios";

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

  async function ListFriends() {
    axios
      .get("/List-Friends")
      .then((res) => {
        setFriendsList(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setFriendsList([
      { id: 1, name: "Geo", isOnline: true },
      { id: 2, name: "Gorila", isOnline: false },
      { id: 3, name: "Ana", isOnline: true },
      { id: 4, name: "Carlos", isOnline: false },
    ]);
  }, []);

  return (
    <div className="flex">
      <div className="">
        <SideBar
          friendsList={friendsList}
          setClickedChat={setClickedChat}
          setNameChat={setNameChat}
        />
      </div>
      <div className="w-full h-14 bg-[#3e362e] mt-12 ml-80">
        {!isClickedChat ? (
          <div>
            <div className="w-full h-full"></div>
          </div>
        ) : (
          <div className="bg-transparent">
            <div className="my-4 mx-3 ">
              <div className=" text-lg font-bold">
                <h1 className="">{nameChat}</h1>
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Chats;
