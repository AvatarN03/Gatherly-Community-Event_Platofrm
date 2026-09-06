import { Link } from "react-router-dom";

import { CalendarPlus, Compass, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 md:px-12">

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
    </footer>
  );
};
