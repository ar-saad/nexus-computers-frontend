import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
