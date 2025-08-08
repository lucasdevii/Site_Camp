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
  const { nameUser, description, isLogged }: ContextsType =
    useContext(LoginContext)!; //cuidado tbm, ficar undefined provavelmente traria problemas;

  return (
    <div className="h-screen fixed">
      <div onClick={() => setOpenSideBar(false)}>
        <img src="return-svgrepo-com.svg" alt="Return" />
      </div>
      <div>
        <p>
          `name: ${nameUser}
          isLogged: ${isLogged}
          descrição: ${description}`
        </p>
      </div>
    </div>
  );
}
export default SideBar;
