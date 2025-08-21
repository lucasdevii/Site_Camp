import { useState } from "react";

import ModalFriendsNew from "./modalFriendsNew";
//import UrlCreate from "./URLChangeForString/URLChangeForString";

type Friends = {
  code: string | null;
  name: string;
  isOnline: boolean;
};
type SideBarProp = {
  friendsList: Friends[];
  setClickedChat: React.Dispatch<React.SetStateAction<boolean>>;
  setNameChat: React.Dispatch<React.SetStateAction<string | null>>;
};

function SideBar({ friendsList, setClickedChat, setNameChat }: SideBarProp) {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  const [idChat, setIdChat] = useState<string | null>(null);

  function ListFriends() {
    return (
      <>
        {friendsList.map((friend) => {
          //const url: string | undefined = UrlCreate(friend.photo);
          return (
            <div
              key={friend.code}
              className={`flex items-center my-2 hover:bg-stone-700 mr-2 rounded-sm p-1 pl-2 cursor-pointer ${
                idChat == friend.code ? "bg-[#3e362e]" : ""
              }`}
              onClick={() => {
                if (idChat == friend.code) {
                  setClickedChat(false);
                  setNameChat(null);
                  setIdChat(null);
                } else {
                  setClickedChat(true);
                  setNameChat(friend.name);
                  setIdChat(friend.code);
                }
              }}
            >
              <div className="mr-3 bg-transparent">
                {/* {friend.photo ? (
                  <div className="bg-transparent">
                    <img src={url} alt={"USER:"} />
                  </div>
                ) : ( */}
                <div className="flex bg-transparent">
                  <img
                    src="./circle-person-profile-user-group-people-svgrepo-com.svg"
                    alt=""
                  />
                </div>
                {/* )} */}
              </div>
              <div className="flex flex-col bg-transparent">
                <h2 className="bg-transparent">{`${friend.name}`}</h2>
                <p className="text-[#b69b80] bg-transparent">
                  {friend.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="">
      {modalOpen ? <ModalFriendsNew /> : ""}
      <div className="w-80 mt-12 fixed h-full border-r border-r-stone-700">
        <div className="mx-6 my-4 h-3/4">
          <h1 className="font-bold text-lg">Direct de mensagens</h1>
          <div className="mt-2">
            <button
              onClick={() => SetModalOpen(true)}
              className="py-1 px-24 mb-3 whitespace-nowrap bg-[#3e362e] rounded-xl hover:bg-[rgb(51,47,38)] duration-100"
            >
              Add friend
            </button>
          </div>
          <div className="overflow-y-scroll h-full">
            {friendsList.length > 0 ? <ListFriends /> : "Nenhum amigo"}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
