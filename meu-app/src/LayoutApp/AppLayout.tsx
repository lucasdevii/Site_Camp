import { Outlet } from "react-router-dom";
import { LoginProvider } from "../Context/provider_login";
import Header from "../components/header";

function Layout() {
  return (
    <LoginProvider>
      <Header />
      <Outlet />
    </LoginProvider>
  );
}
export default Layout;
