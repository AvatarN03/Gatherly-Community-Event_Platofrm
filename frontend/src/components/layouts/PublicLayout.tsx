import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { NonLoginNavbar } from "../NonLoginNavbar";

const PublicLayout = () => {
  return (
    <>
      <NonLoginNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
