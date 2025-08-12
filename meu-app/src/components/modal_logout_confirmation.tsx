import axios from "axios";
import { createPortal } from "react-dom";

type setModalType = {
  setModalIsTrue: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalLogout({ setModalIsTrue }: setModalType) {
  function RemoveAccount() {
    axios
      .post(
        "http://localhost:4001/Desconnect_Account",
        {},
        { withCredentials: true }
      )
      .then(() => {
        document.location.reload();
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
