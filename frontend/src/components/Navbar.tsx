import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/react";
import {Bell, Calendar, CalendarRange, Network, PanelLeft, UsersRound} from "lucide-react";

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
        <header className="sticky top-0 z-30 mb-1 bg-mist p-4 rounded-sm flex  gap-4 border-b border-stone py-6  sm:items-center justify-between">
            <div className="flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    aria-pressed={isSidebarOpen}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate/70 bg-light-ocean  transition-colors hover:bg-slate/40  "
                >
                    <PanelLeft />
                </button>

                {/* Welcome */}
                <div className="hidden md:flex">
                    <h1 className="text-xl font-semibold text-night">
                        Welcome back{isLoaded ? "," : ""} <span className="text-orchid">{isLoaded ? firstName : ""}</span>
                    </h1>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
                <Link
                    to="/communities/create"
                    className="flex items-center gap-1.5 border border-slate/70 bg-cocoa px-3.5 py-2 text-sm font-medium text-night transition-colors hover:bg-cocoa/80"
                >
                    <Network className="h-4 w-4" />
                    <p className="hidden md:block">Community</p>
                    <UsersRound className="h-4 w-4 md:hidden" />
                </Link>

                <Link
                    to="/events/create"
                    className="flex items-center gap-1.5  bg-orchid px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-orchid/30 transition-colors hover:bg-orchid/90"
                >
                    <Calendar className={"w-4 h-4"}/>
                    <p className="hidden md:block">Event</p>
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

                {/* Clerk profile — avatar + name, dropdown (manage account / sign out) built in */}
                <div className="flex items-center gap-2.5  py-1.5 pl-1.5 pr-1.5 md:pr-3">
                    <UserButton
                        appearance={{ elements: { avatarBox: "h-7 w-7 rounded-lg" } }}
                    />
                    <span className="hidden lg:max-w-35 truncate text-md font-medium text-night xl:block">
                        {isLoaded ? fullName : "Loading..."}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;