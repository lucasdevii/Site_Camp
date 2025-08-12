import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/context_login";

type UserData = {
  password: string;
  email: string;
};
interface TypeIsLoggedContext {
  setIsLogged: (value: boolean) => void;
}

function Login() {
  const navigate = useNavigate();
  const { setIsLogged }: TypeIsLoggedContext = useContext(LoginContext)!;

  const [emailUser, setEmailUser] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState<string>("");
  const [paragrafEmail, setParagrafEmail] = useState<string>("");
  const [paragrafPassword, setParagrafPassword] = useState<string>("");
  async function LoginFun() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];

    const isPasswordValid =
      passwordUser.trim() !== "" && passwordUser.length >= 8;
    const isEmailFormatValid = emailRegex.test(emailUser);
    const emailDomain = emailUser.split("@")[1];
    const isDomainAllowed = allowedDomains.includes(emailDomain);
    const isEmailValid =
      emailUser.trim() !== "" &&
      emailUser.length >= 6 &&
      isEmailFormatValid &&
      isDomainAllowed;
    if (!isEmailValid) {
      setParagrafEmail("Email digitado esta inválido");
    } else {
      setParagrafEmail("");
    }

    if (!isPasswordValid) {
      setParagrafPassword("Senha digitada esta inválida");
    } else {
      setParagrafPassword("");
    }

    if (isPasswordValid && isEmailValid) {
      const objUsers: UserData = {
        password: passwordUser,
        email: emailUser,
      };
      await axios
        .post("http://localhost:4001/Login", objUsers, {
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data.success;
          if (response) {
            setIsLogged(true);
            navigate("/Home");
          } else {
            setParagrafPassword("Email ou senha inválidos");
            setIsLogged(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 400) {
              setParagrafPassword(error.response.data.message);
            } else if (status === 500) {
              setParagrafPassword(
                "Erro interno do servidor. Tente mais tarde."
              );
            } else {
              setParagrafPassword("Erro desconhecido.");
            }
          } else {
            setParagrafPassword("Erro de conexão.");
          }
        });
    }
  }

  return (
    <>
      <div className="pt-12 flex h-screen">
        <div className="mx-10 my-2 px-5 py-4 rounded-lg space-y-2">
          <div className="mb-4">
            <h2 className="text-4xl font-semibold">Bem vindo de volta</h2>
          </div>
          <div>
            <p className="text-xl">Email</p>
            <input
              type="text"
              value={emailUser}
              className="bg-[#3e362e] w-96 p-1 rounded-lg text-white h-9 mb-1"
              onChange={(e) => setEmailUser(e.target.value)}
            />
            <p className="text-sm">{paragrafEmail}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Password</p>
            <input
              type="text"
              value={passwordUser}
              className="bg-[#3e362e] w-96 p-1 rounded-lg text-white h-9 mb-1"
              onChange={(e) => setPasswordUser(e.target.value)}
            />
            <p className="text-sm">{paragrafPassword}</p>
            <Link to={""} className="underline text-sm my-1 text-[#b69b80]">
              esqueci minha senha
            </Link>
          </div>
          <div className="w-full">
            <button
              className="bg-yellow-700 w-full rounded-xl h-8 mt-1 hover:bg-yellow-900 hover:scale-105 duration-100"
              onClick={() => LoginFun()}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
