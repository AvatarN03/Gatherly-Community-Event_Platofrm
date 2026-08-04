import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { NonLoginNavbar } from "../NonLoginNavbar";
import Wrapper from "../Wrapper";

const PublicLayout = () => {
  return (
    <>
      <NonLoginNavbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
};

export default PublicLayout;
