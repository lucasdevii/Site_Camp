import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Rooms from "./pages/Rooms";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import Sign from "./pages/Sign";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
