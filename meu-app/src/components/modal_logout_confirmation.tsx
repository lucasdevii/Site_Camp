import axios from "axios";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { LoginContext } from "../Context/context_login";

type setModalType = {
  setModalIsTrue: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
interface TypeIsLoggedContext {
  setIsLogged: (value: boolean) => void;
  description: string;
  nameUser: string;
  isLogged: boolean;
}

export default function ModalLogout({
  setModalIsTrue,
  setOpenSideBar,
}: setModalType) {
  const { setIsLogged }: TypeIsLoggedContext = useContext(LoginContext)!;
  function RemoveAccount() {
    axios
      .post(
        "http://localhost:4001/Desconnect_Account",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setOpenSideBar(false);
        setIsLogged(false);
        setModalIsTrue(false);
      })
      .catch((error) => console.log(error));
  }
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-stone-800 rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4 bg-transparent">
          Tem certeza que deseja sair?
        </h2>
        <p className="mb-4 bg-transparent">
          Essa ação não poderá ser desfeita.
        </p>
        <div className="flex justify-end gap-3 bg-transparent">
          <button
            className="px-3 py-1 bg-stone-600 rounded transition-transform hover:scale-110"
            onClick={() => setModalIsTrue(false)}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded  transition-transform hover:scale-110"
            onClick={() => RemoveAccount()}
          >
            Sair
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
