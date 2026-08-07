import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./components/layouts/PublicLayout";
import Marketing from "./pages/marketing";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import MainLayout from "./components/layouts/MainLayout";
import { CreateCommunityPage } from "./pages/community/createCommunity";
import Communities from "./pages/community/communities.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Marketing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route element={<MainLayout />}>

          <Route path="communities" element={<Communities />} />
          <Route path="communities/create" element={<CreateCommunityPage />} />
        </Route>


      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
};

export default App;
