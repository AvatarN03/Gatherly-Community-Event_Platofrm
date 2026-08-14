import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Menu, Users, X, LogIn, SquarePen } from "lucide-react";
import { SignInButton, SignUpButton, useAuth, UserButton, useUser } from "@clerk/react";

export const NonLoginNavbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef?.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`min-h-18 w-full flex items-center border-b border-slate-500 shadow-md sticky top-0 z-50  transition-all duration-300`}
    >
      <nav
        ref={menuRef}
        className="grid grid-cols-2 md:grid-cols-3 items-center max-w-400 mx-auto w-full px-3"
      >
        <div className="flex items-center gap-4">

          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
            <div className="text-xl font-semibold tracking-wider flex items-center gap-1 group">
              <img
                src="/logo2.svg"
                alt="Logo"
                className="w-8 h-8 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300"
              />
          
              <h3 className="text-black text-lg font-semibold tracking-wider">
                G
                <span
                  className="
                    relative inline-block
                    text-slate-700
                    group-hover:text-black
                    transition-colors
                    after:content-['']
                    after:absolute
                    after:left-0
                    after:bottom-0
                    after:h-[2.5px]
                    after:w-0
                    after:bg-teal-700
                    after:transition-all
                    after:duration-300
                    group-hover:after:w-full
                  "
                >
                  atherly
                </span>
              </h3>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <ul className="space-x-4 flex ">
            <Link
              to="/communities"
              className="flex items-center transition-colors underline-hover hover:bg-slate-50 p-2 rounded-md"
            >
              <Users className="w-4 h-4 inline-block mr-1" />
              Communities
            </Link>
            <Link
              to="/events"
              className="group flex items-center transition-colors underline-hover hover:bg-slate-50 p-2 rounded-md"
            >
              <CalendarDays className="w-4 h-4 inline-block mr-1" />
              Events
            </Link>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4">
          {/* Desktop links */}
          <div className="min-w-24 hidden md:flex items-center justify-center gap-3">
            {isLoaded ? (
              !isSignedIn ? (
                <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className=" px-2 py-1 rounded-md flex items-center gap-2 text-sm cursor-pointer text-slate-800 hover:text-slate-900 transition-colors border-2 border-teal-600  hover:bg-slate-100">
                    Sign In
                  </button>
                  </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-2 py-1.5 rounded-md flex items-center bg-teal-400   hover:bg-teal-300 text-black  gap-2 text-sm cursor-pointer transition-colors shadow-lg">
                    Sign Up
                  </button>
                  </SignUpButton>



                </div>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="px-2 py-1.5 text-sm shadow-lg border border-slate-800 bg-teal-400 hover:bg-orchid/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="hidden md:block">
                    <UserButton />
                  </div>
                </>
              )
            ) : (
              <div className="w-36 h-8 rounded-sm bg-slate-300 animate-pulse" />
            )}
          </div>

          {/* Hamburger button */}
          <button
            className="block w-8 h-8 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X  />
            ) : (
              <Menu  />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full grid transition-[grid-template-rows] duration-300 ease-in-out ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          {/* This wrapper is what actually clips the height, so the animation
              always matches the real content size instead of an arbitrary max-h value */}
          <div className="overflow-hidden">
            <div
              className={`flex flex-col items-center gap-2 px-4 p-4 w-full bg-teal-50 border border-teal-200 border-t-0 rounded-b-2xl transition-[opacity,transform] duration-300 ease-in-out ${isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="flex flex-col items-center w-full divide-y divide-teal-200 gap-1">
                <Link
                  to="/communities"
                  onClick={closeMenu}  // ← closes menu
                  className="flex items-center gap-4 text-teal-800 text-base py-3 w-full transition-colors duration-200 hover:text-teal-600"
                >
                  <Users className="w-5 h-5" />
                  Communities
                </Link>

                <Link
                  to="/events"
                  onClick={closeMenu}  // ← closes menu
                  className="flex items-center gap-4 text-teal-800 text-base py-3 w-full transition-colors duration-200 hover:text-teal-600"
                >
                  <CalendarDays className="w-5 h-5" />
                  Events
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="flex items-center gap-4 text-teal-800 text-base py-3 w-full transition-colors duration-200 hover:text-teal-600"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center gap-4 text-teal-800 text-base py-3 w-full transition-colors duration-200 hover:text-teal-600"
                >
                  Contact
                </Link>

                {isLoaded ? (
                  !isSignedIn ? (
                    <div className="flex items-center gap-3 w-full pt-4">
                      <SignInButton mode="modal">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-teal-500 py-2.5 px-3 text-sm cursor-pointer  transition-all duration-200 hover:bg-teal-100">
                          <LogIn className="w-4 h-4" /> Sign In
                        </button>
                      </SignInButton>

                      <SignUpButton mode="modal">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-teal-500 py-2.5 px-3 text-sm cursor-pointer transition-all duration-200 hover:bg-teal-400">
                          <SquarePen className="w-4 h-4" />
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-4" onClick={closeMenu}>
                      <UserButton />
                      <span className="text-teal-800 text-sm">{user?.firstName || "Profile"}</span>
                    </div>
                  )
                ) : (
                  <div className="w-36 h-8 rounded-sm bg-teal-200 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};