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
      <div className="flex items-center justify-between">
        <div>
          <div className="w-8">
            <img
              src="circle-person-profile-user-group-people-svgrepo-com.svg"
              alt=""
            />
          </div>
          <div className="">
            <p>{`${nameUser}`}</p>
            <p>{`${isLogged}`}</p>
          </div>
        </div>
        <div className="" onClick={() => setOpenSideBar(false)}>
          <p className="text-sm text-red-600 cursor-pointer">X</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default SideBar;
