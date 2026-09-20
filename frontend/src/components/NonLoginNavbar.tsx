import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, LogIn, Menu, SquarePen, Users, X } from "lucide-react";
import { SignInButton, SignUpButton, useAuth, UserButton, useUser } from "@clerk/react";

const navLinkClass =
  "navbar-link inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-normal text-foreground transition-colors hover:text-primary";

export const NonLoginNavbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/75 backdrop-blur-lg shadow-[0_1px_10px_rgba(15,23,42,0.06)]">
      <nav
        ref={menuRef}
        aria-label="Primary navigation"
        className="relative mx-auto flex min-h-16 w-full max-w-420 items-center gap-6 px-5 sm:px-7"
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center rounded-md gap-2 py-2 pr-2"
          aria-label="Gatherly home"
        >
          <img
            src="/logo2.svg"
            alt="Gatherly logo"
            className="h-9 w-9 transition-transform duration-300 ease-in-out group-hover:rotate-[20deg] group-hover:scale-[1.06]"
          />
          <h2 className="relative text-lg font-light tracking-[0.12em] uppercase text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
            Gatherly
          </h2>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/communities" className={navLinkClass}>
            <Users className="h-4 w-4 text-teal-600" />
            Communities
          </Link>
          <Link to="/events" className={navLinkClass}>
            <CalendarDays className="h-4 w-4 text-teal-600" />
            Events
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex text-xs" >
          {!isLoaded ? (
            <div className="h-9 w-28 animate-pulse rounded-md bg-slate-100" aria-label="Loading" />
          ) : !isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5  font-normal text-foreground transition-colors hover:text-primary">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center gap-2 rounded-xs bg-teal-600 px-3.5 py-2  font-semibold text-white shadow-sm shadow-teal-600/20 transition-colors hover:bg-teal-700">
                  <SquarePen className="h-4 w-4" />
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-teal-700/20 transition-colors hover:bg-teal-700 hover:shadow-md hover:shadow-teal-700/20"
              >
                Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="ml-1 border-l border-slate-200 pl-3">
                <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="ml-auto inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:text-primary md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div
          className={`absolute left-0 top-full w-full overflow-hidden border-b border-border bg-background shadow-lg transition-[grid-template-rows,opacity] duration-200 md:hidden ${
            isMenuOpen ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-1 bg-background p-4">
              <Link to="/communities" onClick={closeMenu} className={navLinkClass}>
                <Users className="h-4 w-4 text-teal-600" /> Communities
              </Link>
              <Link to="/events" onClick={closeMenu} className={navLinkClass}>
                <CalendarDays className="h-4 w-4 text-teal-600" /> Events
              </Link>
              <Link to="/about" onClick={closeMenu} className={navLinkClass}>About</Link>
              <Link to="/contact" onClick={closeMenu} className={navLinkClass}>Contact</Link>

              <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-3">
                {!isLoaded ? (
                  <div className="h-9 w-full animate-pulse rounded-md bg-slate-100" />
                ) : !isSignedIn ? (
                  <>
                    <SignInButton mode="modal">
                      <button className="flex-1 cursor-pointer rounded-md border border-primary px-3 py-2 text-sm font-normal text-primary hover:bg-accent">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="flex-1 cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-700">Sign Up</button>
                    </SignUpButton>
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <Link to="/dashboard" onClick={closeMenu} className="text-sm font-semibold text-teal-700">Dashboard</Link>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>{user?.firstName || "Profile"}</span>
                      <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
