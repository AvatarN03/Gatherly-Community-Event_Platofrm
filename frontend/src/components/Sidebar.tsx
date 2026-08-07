
import { Link, NavLink } from "react-router-dom";
import {Settings, X} from "lucide-react";

import {menus} from "../constant";
import {useUser} from "@clerk/react";
import {useEffect} from "react";


const Sidebar = ({
    isOpen,
    onClose,
}: {
    isSignedIn: boolean;
    isOpen: boolean;
    onClose: () => void;
}) => {

    const { user } = useUser();

    if(!user) return null;




    const renderHeader = () => (
        <div className="flex items-center justify-between px-4 py-5 border-b border-night">
            <Link to="/" onClick={onClose}>
                <div className="text-xl font-semibold tracking-wider text-lavender flex items-center gap-3 group ">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-12 h-12 group-hover:scale-110 transition-transform group-hover:rotate-90 duration-300"
                    />
                    <h3 className="text-night text-2xl font-medium tracking-wider">
                        G
                        <span className="text-night/70 group-hover:text-night underline-hover transition-colors">
                            atherly
                        </span>
                    </h3>
                </div>
            </Link>

            <button onClick={onClose} className=" lg:hidden p-2 rounded-md bg-slate hover:bg-stone/20 shrink-0">
                <X className="w-5 h-5 text-white" />
            </button>

        </div>
    );

    // Dashboard / nav links — this is the scrollable middle section
    const renderMenu = ({flag}: {flag: boolean}) => (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {menus.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        onClick={flag? onClose:  null}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                                isActive
                                    ? "bg-orchid text-cocoa"
                                    : "text-slate hover:bg-stone/20 hover:translate-x-1"
                            }`
                        }
                    >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className={"text-sm"}>{item.title}</span>
                    </NavLink>
                );
            })}
        </div>
    );

    const renderProfileFooter = () => (
        <div className="border-t border-night/20 p-4">
            <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 ${
                        isActive
                            ? "bg-orchid text-mist"
                            : "text-fog hover:bg-cocoa"
                    }`
                }
            >
                <div className="h-9 w-9 rounded-full border-2 border-orchid flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm text-forest truncate">{user.fullName}</span>
                    <span className="text-xs text-slate truncate">{user.primaryEmailAddress.emailAddress}</span>
                </div>
                </NavLink>
        </div>
    );


    return (
        <>
            {/* Desktop */}
            <aside
                className={`sticky top-0 hidden h-dvh shrink-0 self-start flex-col bg-mist shadow-sm border-r border-forest/50 shadow-lavender transition-all duration-300 ease-in-out lg:flex ${
                    isOpen ? "w-58" : "w-0 overflow-hidden"
                }`}
            >
                {renderHeader()}
                {renderMenu({flag:false})}
                {renderProfileFooter()}
            </aside>

            {/* Mobile drawer — always mounted so the slide/fade can animate both ways */}
            <div
                className={`lg:hidden fixed inset-0 z-50 flex ${
                    isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                aria-hidden={!isOpen}
            >
                <div
                    className={`flex flex-col w-72 h-dvh bg-mist shadow-lg shadow-black/40 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {renderHeader()}
                    {renderMenu({flag:true})}
                    {renderProfileFooter()}
                </div>

                <div
                    className={`flex-1 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={onClose}
                />
            </div>
        </>
    );
};

export default Sidebar;
