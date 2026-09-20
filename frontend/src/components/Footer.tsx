import { Link } from "react-router-dom";

import { CalendarPlus, Compass, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-6 py-12 md:px-12 overflow-hidden shadow-[0_-12px_40px_rgba(0,0,0,0.35)]">

      {/* Top grid */}
      <div className="mx-auto grid max-w-350 grid-cols-1 gap-10 md:grid-cols-4">

        {/* Brand */}
        <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
          <Link to="/">
            <div className="flex items-center gap-2 group">
              <img
                src="/logo2.svg"
                alt="Gatherly logo"
                className="h-10 w-10 transition-transform duration-200 group-hover:scale-[1.06]"
              />
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                Gatherly
              </h3>
            </div>
          </Link>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            The home for communities that actually show up. Build, grow, and
            gather — all in one place.
          </p>
          <div className="flex gap-3">
            <Link
              to="https://github.com/AvatarN03/Gatherly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground"
            >
              <img src="/github.png" alt="github" className="h-5 w-5" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Product */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Product
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Explore events", to: "/events", icon: <Compass size={14} /> },
              { label: "Communities", to: "/communities", icon: <Users size={14} /> },
              {
                label: "Host an event",
                to: "/events/create",
                icon: <CalendarPlus size={14} />,
              },
            ].map(({ label, to, icon }) => (
              <Link
                key={label}
                to={to}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Company
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/about"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © 2026 Gatherly. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Cookies"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Giant brand watermark with project teal/emerald gradient, logo icon, and ambient glow */}
      <div className="relative mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 overflow-hidden py-4" aria-hidden="true">
        {/* Ambient brand glow/shadow behind the text and logo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/4 -z-10 flex items-center justify-center">
          <div className="h-44 w-3/4 max-w-4xl rounded-full bg-teal-500/20 blur-3xl" />
        </div>

        {/* Brand logo icon beside the text */}
        <img
          src="/logo2.svg"
          alt=""
          className="h-14 w-14 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 shrink-0 object-contain drop-shadow-[0_8px_30px_rgba(45,212,191,0.4)] transition-transform duration-500 hover:rotate-12"
        />

        <h2
          className="select-none text-center font-extrabold uppercase leading-none tracking-wider drop-shadow-[0_8px_30px_rgba(20,184,166,0.3)]"
          style={{
            fontSize: "clamp(3.5rem, 13.5vw, 13rem)",
            background: "linear-gradient(180deg, #99f6e4 0%, #2dd4bf 28%, #14b8a6 55%, #0f766e 80%, #042f2e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Gatherly
        </h2>
      </div>
    </footer>
  );
};
