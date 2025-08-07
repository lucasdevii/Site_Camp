import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

type UserData = {
  password: string;
  email: string;
};

function Login() {
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
    if (isEmailValid) {
      setParagrafEmail("Email digitado esta inválido");
    }
    if (isPasswordValid) {
      setParagrafPassword("Senha digitada esta inválida");
    }

    if (isPasswordValid && isEmailValid) {
      const objUsers: UserData = {
        password: passwordUser,
        email: emailUser,
      };
      await axios.post(
        "http://localhost:4001/SignUp",
        { object: objUsers },
        {
          withCredentials: true,
        }
      );
    } else {
      alert("Dados inválidos. Verifique os campos.");
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
              className="bg-[#3e362e] w-96 rounded-lg text-black h-9"
              onChange={(e) => setEmailUser(e.target.value)}
            />
            <p>{paragrafEmail}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Password</p>
            <input
              type="text"
              className="bg-[#3e362e] w-96 rounded-lg text-black h-9"
              onChange={(e) => setPasswordUser(e.target.value)}
            />
            <p>{paragrafPassword}</p>
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
