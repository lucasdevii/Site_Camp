import { useContext, useState } from "react";
import { LoginContext } from "../Context/context_login";
import ModalLogout from "./modal_logout_confirmation";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
type ContextsType = {
  nameUser: string;
  description: string;
  isLogged: boolean;
  codeInvite: string;
};

function SideBar({ setOpenSideBar }: SideBarProps) {
  const navigate = useNavigate();
  const { nameUser, codeInvite }: ContextsType = useContext(LoginContext)!; //cuidado tbm, ficar undefined provavelmente traria problemas;
  const [modalIsTrue, setModalIsTrue] = useState<boolean>(false);
  return (
    <aside className="rounded-l-2xl px-1 mx-1.5 py-2">
      <div className="flex items-center justify-between">
        <div className="flex h-7">
          <div className="w-8 mr-1">
            <img src="circle-person-profile.svg" alt="Perfil" />
          </div>
          <div className="">
            <p className="text-xs">{`${nameUser}`}</p>
            <div className="flex space-x-2">
              <p className="text-[9px]">{`${codeInvite}`}</p>
              <div className="w-3 cursor-pointer hover:scale-125 duration-100 flex items-center">
                <img src="copy.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="mr-2 rounded-full border-2 border-red-400 h-6 w-6 flex justify-center items-center"
          onClick={() => setOpenSideBar(false)}
        >
          <span className="text-sm text-red-500 cursor-pointer font-sans">
            X
          </span>
        </div>
      </div>

      <div className="my-4">
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {}}
        >
          <img src="face-smile.svg" alt="" className=" w-5" />
          <span className="font-serif ">Alterar status</span>
        </div>
        <hr />
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("/Perfil.tsx");
            setOpenSideBar(false);
          }}
        >
          <img src="user-solo.svg" alt="" className=" w-5" />
          <span className="font-serif ">Seu perfil</span>
        </div>
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("/Campaigns_user.tsx");
            setOpenSideBar(false);
          }}
        >
          <img src="list.svg" alt="" className=" w-5" />
          <span className="font-serif ">Suas campanhas</span>
        </div>
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("/History_Guide.tsx");
            setOpenSideBar(false);
          }}
        >
          <img src="book.svg" alt="" className=" w-5" />
          <span className="font-serif ">Suas historias</span>
        </div>
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("/Friends");
            setOpenSideBar(false);
          }}
        >
          <img src="user-search.svg" alt="" className=" w-5" />
          <span className="font-serif ">Suas amizades</span>
        </div>
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("");
            setOpenSideBar(false);
          }}
        >
          <img src="settings-point.svg" alt="" className="w-5 " />
          <span className="font-serif ">Gerenciamento de grupos</span>
        </div>
        <hr className="my-3" />
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => {
            navigate("/Config_User.tsx");
            setOpenSideBar(false);
          }}
        >
          <img src="engrenagem.svg" alt="" className=" w-5" />
          <span className="font-serif ">Configurações</span>
        </div>
        <div
          className="h-7 my-1 hover:bg-stone-800 w-full cursor-pointer space-x-1 px-1 mx-1 flex items-center hover:scale-105 duration-150"
          onClick={() => setModalIsTrue(!modalIsTrue)}
        >
          <img src="exit-door.svg" alt="" className=" w-5" />
          <span className="font-serif ">Deslogar</span>
        </div>
      </div>
      {modalIsTrue && (
        <ModalLogout
          setModalIsTrue={setModalIsTrue}
          setOpenSideBar={setOpenSideBar}
        />
      )}
    </aside>
  );
}
export default SideBar;
