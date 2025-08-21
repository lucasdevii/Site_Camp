import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Context/context_login";
import axios from "axios";

interface ContextType {
  nameUser: string;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  description: string;
  codeInvite: string;
}
interface FriendsObjType {
  name: string;
  code: string;
}
interface RequestsObjType {
  name: string;
  code: string;
}
interface ReceivesObjType {
  name: string;
  code: string;
}

function Friends() {
  const { codeInvite }: ContextType = useContext(LoginContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFriends, setListFriends] = useState<FriendsObjType[]>([]);
  const [listRequests, setListRequests] = useState<RequestsObjType[]>([]);
  const [listReceives, setListReceives] = useState<ReceivesObjType[]>([]);
  const [positionBarClicked, setPositionBarClicked] = useState<string>();
  useEffect(() => {
    axios
      .post("/Friends/List", codeInvite)
      .then((res) => {
        setListFriends(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("/Friends/Requests", codeInvite)
      .then((res) => {
        setListRequests(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("/Friends/Receives", codeInvite)
      .then((res) => {
        setListReceives(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [listFriends]);

  return (
    <div className="pt-16 h-screen w-full flex flex-col items-center">
      {/* <div className="w-11/12 space-y-3">
        <h1 className="text-xl">Informações</h1>
        <div className="flex space-x-3">
          <img src="circle-person-profile.svg" alt="" className="w-24 " />
          <div>
            <div className="flex justify-between">
              <p className="text-lg">Name: {nameUser}</p>
              <Link to="/Config">
                <img
                  className="cursor-pointer invert w-5"
                  src="pen-modifier.svg"
                  alt=""
                />
              </Link>
            </div>
            <p className="text-lg">Description: {description}</p>
            <p className="text-lg">Invite code: {codeInvite}</p>
          </div>
        </div>
      </div> */}
      <div className="w-10/12 space-y-1 mb-3">
        <h1 className=" text-2xl font-semibold text-yellow-600">
          Friends List
        </h1>
        <p className="text-xs">Manegement your friends and requests</p>
      </div>

      <div className="w-10/12 flex space-x-4 mb-1">
        <div className="w-20 flex justify-center">
          <h2
            className="cursor-pointer"
            onClick={() => {
              setPositionBarClicked("button_1");
            }}
          >
            All friends
          </h2>
        </div>
        <div className="w-20 flex justify-center">
          <h2
            className="cursor-pointer"
            onClick={() => {
              setPositionBarClicked("button_2");
            }}
          >
            Requests
          </h2>
        </div>
        <div className="w-20 flex justify-center">
          <h2
            className="cursor-pointer"
            onClick={() => {
              setPositionBarClicked("button_3");
            }}
          >
            Receives
          </h2>
        </div>
        <div className="w-20 flex justify-center">
          <h2
            className="cursor-pointer"
            onClick={() => {
              setPositionBarClicked("button_4");
            }}
          >
            Sugestions
          </h2>
        </div>
      </div>
      {/* Barra q vai para o lado*/}
      <div className="w-10/12">
        <div
          className={`h-1 w-20 bg-yellow-600 duration-150 ${
            positionBarClicked == "button_1" && "translate-x-0"
          } ${positionBarClicked == "button_2" && "translate-x-24"} ${
            positionBarClicked == "button_3" && "translate-x-48"
          } ${positionBarClicked == "button_4" && "translate-x-72"} `}
        ></div>
      </div>
      <div
        className={`w-10/12 h-5/6 overflow-hidden relative bg-stone-800 rounded-b-2xl flex justify-start `}
      >
        {/*Primeiro slide*/}
        <div
          className={`w-full h-full flex-shrink-0 duration-150 ${
            positionBarClicked == "button_1" && "-translate-x-0"
          } ${positionBarClicked == "button_2" && "-translate-x-[100%]"} ${
            positionBarClicked == "button_3" && "-translate-x-[200%]"
          } ${positionBarClicked == "button_4" && "-translate-x-[300%]"} `}
        >
          {!isLoading ? (
            listFriends.length > 0 ? (
              listFriends.map((friend) => {
                return (
                  <li key={friend.code} className="">
                    {friend.name}
                  </li>
                );
              })
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex flex-col h-full justify-center items-center">
                  <img src="search_User.svg" alt="" className="invert w-40" />
                  <h2 className="text-lg">Nenhum amigo encontrado</h2>
                </div>
                <div className="mx-2 my-1">
                  <p>{listFriends.length} / 20</p>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg">Carregando...</h2>
            </div>
          )}
        </div>
        {/*Segundo slide*/}
        <div
          className={`w-full h-full flex-shrink-0 duration-150 ${
            positionBarClicked == "button_1" && "-translate-x-0"
          } ${positionBarClicked == "button_2" && "-translate-x-[100%]"} ${
            positionBarClicked == "button_3" && "-translate-x-[200%]"
          } ${positionBarClicked == "button_4" && "-translate-x-[300%]"} `}
        >
          {!isLoading ? (
            listRequests.length > 0 ? (
              listRequests.map((request) => {
                return (
                  <li key={request.code} className="">
                    {request.name}
                  </li>
                );
              })
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex flex-col h-full justify-center items-center">
                  <img src="search_User.svg" alt="" className="invert w-40" />
                  <h2 className="text-lg">Nenhum pedido enviado</h2>
                </div>
                <div className="mx-2 my-1 flex justify-between">
                  <p className="text-xl">{listRequests.length}</p>
                  <img
                    className="w-6 cursor-pointer duration-75 hover:scale-110"
                    src="delete_Icon.svg"
                    alt=""
                  />
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg">Carregando...</h2>
            </div>
          )}
        </div>
        {/*Terceiro slide*/}
        <div
          className={`w-full h-full flex-shrink-0 duration-150 ${
            positionBarClicked == "button_1" && "-translate-x-0"
          } ${positionBarClicked == "button_2" && "-translate-x-[100%]"} ${
            positionBarClicked == "button_3" && "-translate-x-[200%]"
          } ${positionBarClicked == "button_4" && "-translate-x-[300%]"} `}
        >
          {!isLoading ? (
            listReceives.length > 0 ? (
              listReceives.map((receive) => {
                return (
                  <li key={receive.code} className="">
                    {receive.name}
                  </li>
                );
              })
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex flex-col h-full justify-center items-center">
                  <img src="search_User.svg" alt="" className="invert w-40" />
                  <h2 className="text-lg">Nenhum pedido recebido</h2>
                </div>
                <div className="mx-2 my-1 flex justify-between">
                  <p className="text-xl">{listReceives.length}</p>
                  <img
                    className="w-6 cursor-pointer duration-75 hover:scale-110"
                    src="delete_Icon.svg"
                    alt=""
                  />
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg">Carregando...</h2>
            </div>
          )}
        </div>
        {/*Quarto slide*/}
        <div
          className={`w-full h-full flex-shrink-0 duration-150 ${
            positionBarClicked == "button_1" && "-translate-x-0"
          } ${positionBarClicked == "button_2" && "-translate-x-[100%]"} ${
            positionBarClicked == "button_3" && "-translate-x-[200%]"
          } ${positionBarClicked == "button_4" && "-translate-x-[300%]"} `}
        >
          {!isLoading ? (
            listFriends.length > 0 ? (
              listFriends.map((friend) => {
                return (
                  <li key={friend.code} className="">
                    {friend.name}
                  </li>
                );
              })
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex flex-col h-full justify-center items-center">
                  <img src="search_User.svg" alt="" className="invert w-40" />
                  <h2 className="text-lg">Nenhuma sujestão ainda...</h2>
                </div>
                <div className="mx-2 my-1">
                  <p>{listFriends.length}</p>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg">Carregando...</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Friends;
