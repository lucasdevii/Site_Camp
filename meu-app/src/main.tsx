import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Rooms from "./pages/Rooms";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Config from "./pages/Config_User";
import Friends from "./pages/Friends_Add";
import History from "./pages/History_Guide";
import Perfil from "./pages/Perfil";

import Header from "./components/header";
import "./index.css";

import { LoginProvider } from "./Context/provider_login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/Home",
//     element: <Home />,
//   },
//   {
//     path: "/Salas",
//     element: <Rooms />,
//   },
//   {
//     path: "/Chats",
//     element: <Chats />,
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginProvider>
        <Header />
      </LoginProvider>
    ),
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Salas",
        element: <Rooms />,
      },
      {
        path: "Chats",
        element: <Chats />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Sign_up",
        element: <Sign />,
      },
      {
        path: "Perfil",
        element: <Perfil />,
      },
      {
        path: "History_Campaigns",
        element: <History />,
      },
      {
        path: "Friends",
        element: <Friends />,
      },
      {
        path: "Config_User",
        element: <Config />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
