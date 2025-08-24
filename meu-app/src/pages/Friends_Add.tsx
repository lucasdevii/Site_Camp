import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Context/context_login";
import axios from "axios";
import ModalFriendsNew from "../components/modalFriendsNew";

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
  createdAt: string;
}

function Friends() {
  const { codeInvite }: ContextType = useContext(LoginContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFriends, setListFriends] = useState<FriendsObjType[]>([]);
  const [listRequests, setListRequests] = useState<RequestsObjType[]>([]);
  const [listReceives, setListReceives] = useState<ReceivesObjType[]>([]);
  const [positionBarClicked, setPositionBarClicked] = useState<string>();
  const [buttonNewFriendIsActive, setButtonNewFriendIsActive] =
    useState<boolean>(false);
  useEffect(() => {
    if (!codeInvite) return;
    const fetchData = () => {
      axios
        .post("http://localhost:4001/Friends/List", { code: codeInvite })
        .then((res) => {
          if (res.data.success == true) {
            setListFriends(res.data.friends);
            console.log(res.data.friends);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post("http://localhost:4001/Friends/Requests", { code: codeInvite })
        .then((res) => {
          if (res.data.success == true) {
            setListRequests(res.data.requests);
            console.log(res.data.requests);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post("http://localhost:4001/Friends/Receives", { code: codeInvite })
        .then((res) => {
          if (res.data.success == true) {
            setListReceives(res.data.receives);
            console.log(res.data.receives);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [codeInvite]);
  useEffect(() => {
    setIsLoading(false);
  }, [listFriends, listReceives, listRequests]);

  function ReceiverReject(codeReceiver: string) {
    axios
      .delete("http://localhost:4001/Friends/Reject_Receiver", {
        data: {
          codeReceiver: codeReceiver,
          codeUser: codeInvite,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("deu erro aqui hein");
      });
    axios
      .post("http://localhost:4001/Friends/Receives", { code: codeInvite })
      .then((res) => {
        if (res.data.success == true) {
          setListReceives(res.data.receives);
          console.log(res.data.receives);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function Invite_Accept(codeReceiver: string) {
    axios.post("http://localhost:4001/Friends/Accept_Receiver");
  }
  return (
    <div className="pt-14 h-screen w-full flex flex-col items-center">
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
                <div className="mx-2 my-1 flex justify-between">
                  <p>{listFriends.length} / 20</p>
                  <button
                    onClick={() => setButtonNewFriendIsActive(true)}
                    className="py-1 px-2 bg-yellow-700 rounded-xl"
                  >
                    Add friend
                  </button>
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
                  <div
                    key={request.code}
                    className="flex justify-between mx-4 my-2 hover:bg-stone-700"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src="circle-person-profile.svg"
                        alt=""
                        className="w-10"
                      />
                      <div className="flex flex-col ">
                        <h2>{request.name}</h2>
                        <p className="text-xs"> {request.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h3>Pedido pendente</h3>
                    </div>
                  </div>
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
                  {listRequests.length < 0 && (
                    <img
                      className="w-6 cursor-pointer duration-75 hover:scale-110"
                      src="delete_Icon.svg"
                      alt=""
                    />
                  )}
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
          className={`w-full h-full flex-shrink-0 duration-150 flex flex-col justify-between  ${
            positionBarClicked == "button_1" && "-translate-x-0"
          } ${positionBarClicked == "button_2" && "-translate-x-[100%]"} ${
            positionBarClicked == "button_3" && "-translate-x-[200%]"
          } ${positionBarClicked == "button_4" && "-translate-x-[300%]"} `}
        >
          {!isLoading ? (
            listReceives.length > 0 ? (
              listReceives.map((receive) => {
                return (
                  <div
                    key={receive.code}
                    className="flex justify-between mx-4 my-2"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src="circle-person-profile.svg"
                        alt=""
                        className="w-10"
                      />
                      <div className="flex flex-col ">
                        <h2 className="">{receive.name}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 bg-red-500 rounded-lg hover:scale-110 duration-100"
                        onClick={() => ReceiverReject(receive.code)}
                      >
                        <img src="delete_Icon.svg" alt="" className="w-6" />
                      </button>
                      <button className="px-3 py-1 bg-green-500 rounded-lg hover:scale-110 duration-100">
                        <img src="check_Icon.svg" alt="" className="w-6" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full w-full flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col h-full justify-center items-center">
                  <img src="search_User.svg" alt="" className="invert w-40" />
                  <h2 className="text-lg">Nenhum pedido recebido</h2>
                </div>
                <div className="mx-2 my-1 flex justify-between">
                  <div>
                    {listReceives.length < 0 && (
                      <img
                        className="w-6 cursor-pointer duration-75 hover:scale-110"
                        src="delete_Icon.svg"
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg">Carregando...</h2>
            </div>
          )}
          <div className="w-full">
            <p className="my-2 mx-4">
              quantidade de pedidos: {listReceives.length}
            </p>
          </div>
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
                  <img
                    src="more_Some.svg"
                    alt=""
                    className="invert w-40 rotate-45"
                  />
                  <h2 className="text-lg">Page ainda n configurada</h2>
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
      {buttonNewFriendIsActive ? (
        <>
          <ModalFriendsNew
            setPositionBarClicked={setPositionBarClicked}
            setButtonNewFriendIsActive={setButtonNewFriendIsActive}
          />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Friends;
