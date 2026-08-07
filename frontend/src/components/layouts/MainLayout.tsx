import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "@clerk/react";
import Wrapper from "./Wrapper";
import { NonLoginNavbar } from "../NonLoginNavbar";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Footer } from "../Footer";



const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { isSignedIn} = useAuth();
    const showDashboard = !!isSignedIn;

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);


    return (
        <Wrapper>
            {!showDashboard && <NonLoginNavbar />}

            <div className="flex min-h-dvh">
                {showDashboard && (
                    <Sidebar
                        isSignedIn={showDashboard}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                )}

                <div className="flex min-w-0 flex-1 flex-col">
                    {showDashboard && (
                        <Navbar
                            isSidebarOpen={sidebarOpen}
                                 onToggleSidebar={toggleSidebar}
                        />
                    )}
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </Wrapper>
    );
};

export default MainLayout;
