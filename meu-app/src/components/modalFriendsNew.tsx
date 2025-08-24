import axios from "axios";
import { useContext, useState, type JSX } from "react";
import { LoginContext } from "../Context/context_login";

interface PropsType {
  setButtonNewFriendIsActive: (value: boolean) => void;
  setPositionBarClicked: (value: string) => void;
}
interface ContextType {
  nameUser: string;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  description: string;
  codeInvite: string;
}

function ModalFriendsNew({
  setButtonNewFriendIsActive,
  setPositionBarClicked,
}: PropsType): JSX.Element {
  const { codeInvite }: ContextType = useContext(LoginContext)!;
  const [codeInviteEnvied, setCodeInviteValue] = useState<string>("");
  const [paragrafCode, setParagrafCode] = useState<string>("");
  function CodeInviteEnvied() {
    if (codeInviteEnvied.trim().length !== 36) {
      return setParagrafCode("O código precisa ter 36 digitos");
    } else {
      if (codeInviteEnvied)
        axios
          .post("http://localhost:4001/Friends/Invite", {
            codeInviteEnvied: codeInviteEnvied,
            codeInviter: codeInvite,
          })
          .then((res) => {
            if (res.data.status == 201) {
              setParagrafCode("Pedido enviado!");
              setPositionBarClicked("button_2");
              setButtonNewFriendIsActive(false);
            } else {
              setParagrafCode("Erro na verificação");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-stone-800 rounded-lg shadow-lg px-5 py-3 space-y-3 w-80">
        <div>
          <h1 className="text-xl">Add Friend</h1>
        </div>
        <div>
          <h2>Invite code:</h2>
          <input
            type="text"
            className="px-1 py-1 w-full focus:outline-none bg-stone-700 rounded-lg"
            onChange={(m) => setCodeInviteValue(m.target.value)}
          />
          <p className="text-xs mt-1 text-red-500">{paragrafCode}</p>
        </div>
        <div className="flex space-x-3 justify-end">
          <button
            className="px-3 py-1 rounded-lg bg-red-500 hover:scale-110 hover:bg-red-600 duration-100"
            onClick={() => setButtonNewFriendIsActive(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-yellow-600 hover:scale-110 hover:bg-yellow-800 duration-100"
            onClick={() => {
              CodeInviteEnvied();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalFriendsNew;
