import { useContext } from "react";
import { LoginContext } from "../Context/context_login";

type SideBarProps = {
  setOpenSideBar: (value: boolean) => void;
};
type ContextsType = {
  nameUser: string;
  description: string;
  isLogged: boolean;
};

function SideBar({ setOpenSideBar }: SideBarProps) {
  const { nameUser, isLogged }: ContextsType = useContext(LoginContext)!; //cuidado tbm, ficar undefined provavelmente traria problemas;

  return (
    <div className="rounded-l-2xl px-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex h-8">
          <div className="w-8 mr-1">
            <img
              src="circle-person-profile-user-group-people-svgrepo-com.svg"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-xs">{`${nameUser}`}</p>
            <p className="text-xs">{`${isLogged}`}</p>
          </div>
        </div>
        <div className="" onClick={() => setOpenSideBar(false)}>
          <p className="text-sm text-red-600 cursor-pointer">X</p>
        </div>
      </div>
      <div className="h-8 w-full mb-1 bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>
      <div className="h-8 mb-1 w-full bg-stone-800 rounded-sm border border-stone-700"></div>

      <div></div>
    </div>
  );
}
export default SideBar;
