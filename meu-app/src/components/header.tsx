import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Context/context_login";
export default function Header() {
  const { nameUser, isLogged } = useContext(LoginContext);
  return (
    <>
      <header className="fixed w-full h-12 flex items-center justify-between px-6 py-4 text-white border-b border-stone-700 duration-200">
        <div className="flex items-center cursor-pointer">
          <Link to={"/Home"} className="text-sm">
            Mystic Realms
          </Link>
        </div>
        <div className="flex space-x-6">
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
              <Link to={"/Login"} className="px-4 py-2 bg-transparent text-sm">
                Login
              </Link>
            </div>
            <div className="flex items-center  bg-yellow-900 rounded-md hover:bg-orange-900 hover:text-yellow-200 whitespace-nowrap hover:scale-105 duration-150 cursor-pointer">
              <Link
                to={"/Sign_Up"}
                className="px-3 py-2 bg-transparent text-sm"
              >
                Sign-up
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
