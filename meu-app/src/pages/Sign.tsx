import axios from "axios";
import { useState } from "react";

function Sign() {
  type UserData = {
    name: string;
    password: string;
    email: string;
  };

  const [nameUser, setNameUser] = useState<string>("");
  const [emailUser, setEmailUser] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState<string>("");
  const [paragrafEmail, setParagrafEmail] = useState<string>("");
  const [paragrafName, setParagrafName] = useState<string>("");
  const [paragrafPassword, setParagrafPassword] = useState<string>("");
  function Cadaster() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];

    const isNameValid = nameUser.trim() !== "" && nameUser.length >= 8;
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
      setParagrafEmail("Email digitado está inválido");
    } else {
      setParagrafEmail("");
    }

    if (!isPasswordValid) {
      setParagrafPassword("Senha digitada está inválida");
    } else {
      setParagrafPassword("");
    }
    if (!isNameValid) {
      setParagrafName("Nome Inválido");
    } else {
      setParagrafName("");
    }

    if (isNameValid && isPasswordValid && isEmailValid) {
      const objUsers: UserData = {
        name: nameUser,
        password: passwordUser,
        email: emailUser,
      };

      const response = axios.post(
        "http://localhost:4001/SignUp",
        { object: objUsers },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    }
  }

  return (
    <>
      <div className="pt-12 flex h-screen">
        <div className="mx-10 my-2 px-5 py-4 rounded-lg space-y-2">
          <div className="mb-4">
            <h2 className="text-4xl font-semibold">Cadastro</h2>
          </div>
          <div>
            <p className="text-xl">name</p>
            <input
              type="text"
              className="bg-[#3e362e] text-white w-96 rounded-lg p-1 h-9"
              onChange={(e) => setNameUser(e.target.value)}
            />
            <p>{paragrafName}</p>
          </div>
          <div>
            <p className="text-xl">Email</p>
            <input
              type="text"
              className="bg-[#3e362e] w-96 rounded-lg text-white p-1 h-9"
              onChange={(e) => setEmailUser(e.target.value)}
            />
            <p>{paragrafEmail}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Password</p>
            <input
              type="text"
              className="bg-[#3e362e] w-96 rounded-lg text-white p-1 h-9"
              onChange={(e) => setPasswordUser(e.target.value)}
            />
            <p>{paragrafPassword}</p>
          </div>
          <div className="w-full">
            <button
              className="bg-yellow-700 w-full rounded-xl h-8 mt-1 hover:bg-yellow-900 hover:scale-105 duration-100"
              onClick={() => {
                Cadaster();
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sign;
