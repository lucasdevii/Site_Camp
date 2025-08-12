import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "./sideBarInfo";
import { LoginContext } from "../Context/context_login";

interface SideBarProps {
  nameUser: string;
  isLogged: boolean;
}
function Header() {
  const { nameUser, isLogged }: SideBarProps = useContext(LoginContext)!; //cuidado para essa parada n ficar undefined;
  const [isClicked, setOpenSideBar] = useState<boolean>(false);

  return (
    <>
      <header className="fixed w-full h-12 z-20 flex items-center justify-between px-6 py-4 text-white border-b border-stone-700 duration-200">
        <div className="flex items-center cursor-pointer">
          <Link to={"/Home"} className="text-sm">
            Mystic Realms
          </Link>
        </div>
        {isLogged && nameUser ? (
          <div className="flex space-x-5">
            {/* Links para usuários logados */}
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Home"} className="text-sm">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Chats"} className="text-sm">
                Conversas
              </Link>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Salas"} className="text-sm">
                Salas
              </Link>
            </div>
            <div
              className="flex cursor-pointer"
              onClick={() => setOpenSideBar(true)}
            >
              <img
                className="h-7 w-7"
                src="../../public/circle-person-profile.svg"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="flex space-x-6">
            {/* Links para usuários não logados */}
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Home"} className="text-sm">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Chats"} className="text-sm">
                Conversas
              </Link>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
              <Link to={"/Salas"} className="text-sm">
                Salas
              </Link>
            </div>
            <div className="flex space-x-1">
              <div className="flex items-center bg-yellow-700 rounded-md hover:bg-yellow-600 hover:text-yellow-200 whitespace-nowrap hover:scale-105 duration-150 cursor-pointer">
                <Link
                  to={"/Login"}
                  className="px-4 py-2 bg-transparent text-sm"
                >
                  Login
                </Link>
              </div>
              <div className="flex items-center bg-yellow-900 rounded-md hover:bg-orange-900 hover:text-yellow-200 whitespace-nowrap hover:scale-105 duration-150 cursor-pointer">
                <Link
                  to={"/Sign_Up"}
                  className="px-3 py-2 bg-transparent text-sm"
                >
                  Sign-up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar que aparece quando isClicked for true */}
      <div
        className={`z-30 fixed top-0 right-0 h-full w-80 duration-300 px-2 py-2 border-l border-stone-700 rounded-l-xl ${
          isClicked ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isClicked && <SideBar setOpenSideBar={setOpenSideBar} />}
      </div>

      {/* Conteúdo da rota atual */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
