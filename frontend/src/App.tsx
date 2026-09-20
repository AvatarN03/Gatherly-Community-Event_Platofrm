import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import PublicLayout from "./components/layouts/PublicLayout";
import Marketing from "./pages/marketing";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import MainLayout from "./components/layouts/MainLayout";
import {CreateCommunityPage} from "./pages/community/createCommunity";
import Communities from "./pages/community/communities.tsx";
import CommunityProvider from "./provider/CommunityProvider.tsx";
import CommunityId from "./pages/community/communityId.tsx";
import CommunityChatPage from "./pages/community/CommunityChatPage";
import CommunityNoticePage from "./pages/community/CommunityNoticePage";
import CommunityMembers from "./pages/community/communityMembers.tsx";
import EditCommunityPage from "./pages/community/editCommunity";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout/>}>
                    <Route index element={<Marketing/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Route>

                <Route element={<MainLayout/>}>

                    <Route path="communities" element={<Communities/>}/>
                    <Route path="communities/create" element={<CreateCommunityPage/>}/>

                    <Route path="communities/:slug" element={<CommunityProvider/>}>
                        <Route index element={<CommunityId/>}/>
                        <Route path="chat" element={<CommunityChatPage />} />
                        <Route path="notice" element={<CommunityNoticePage />} />
                        <Route path="members" element={<CommunityMembers />} />
                        <Route path="edit" element={<EditCommunityPage />} />

                    </Route>
                </Route>


            </Routes>
            <Toaster position="bottom-right"/>
        </BrowserRouter>
    );
};

export default App;
