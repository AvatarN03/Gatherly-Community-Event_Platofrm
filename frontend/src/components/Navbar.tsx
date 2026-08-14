import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import {Bell, Calendar, CalendarRange, PanelLeft, Plus, UsersRound} from "lucide-react";

const Navbar = ({
                    isSidebarOpen,
                    onToggleSidebar,
                }: {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}) => {
    const { user, isLoaded } = useUser();

    const firstName = user?.firstName || user?.username || "there";
    const fullName = user?.fullName || user?.username || "Your account";

    return (
        <header className="sticky top-0 z-30 bg-teal-50 px-4 py-3 rounded-sm flex  gap-4 border-b border-stone   sm:items-center justify-between">
            <div className="flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    aria-pressed={isSidebarOpen}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md cursor-pointer   transition-colors hover:bg-slate-200  text-teal-800"
                >
                    <PanelLeft />
                </button>

                {/* Welcome */}
                <div className="hidden md:flex">
                    <h1 className="text-base text-night">
                        Welcome back{isLoaded ? "," : ""} <span className="text-teal-900 font-semibold">{isLoaded ? firstName : ""} ✋🏻</span>
                    </h1>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
                <Link
                    to="/communities/create"
                    className="flex items-center gap-1.5 border border-slate-700 bg-amber-200 px-2.5 py-1.5 text-sm  text-slate-900 rounded-xs hover:shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    <p className="hidden md:block text-xs">Community</p>
                    <UsersRound className="h-4 w-4 md:hidden" />
                </Link>

                <Link
                    to="/events/create"
                    className="flex items-center gap-1.5 border border-slate-700 bg-teal-400 px-2.5 py-1.5 text-sm  text-slate-900 rounded-xs hover:shadow-sm"
                >
                    <Plus className={"w-4 h-4"}/>
                    <p className="hidden md:block text-xs">Event</p>
                    <CalendarRange className="h-4 w-4 md:hidden" />
                </Link>

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate/70 text-forest transition-colors bg-light-ocean hover:text-mist"
                >
                    <Bell className="h-4 w-4" strokeWidth={2} />
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orchid" />
                </button>

                
            </div>
        </header>
    );
};

export default Navbar;