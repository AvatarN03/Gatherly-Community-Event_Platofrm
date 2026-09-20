import { ArrowRight, Radar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const communityImage =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85";

export const Hero = () => {
  return (
    <section id="home" className="bg-transparent px-4 py-2 text-foreground sm:px-6  lg:px-8 mb-8">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-350 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-16 ">
        <div className="flex max-w-2xl flex-col justify-end  items-baseline mb-5">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Meet · Learn · Grow
          </p>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Where Communities{" "}
            <span className="relative z-0 inline-block px-1">
              Grow
              <span className="absolute inset-x-0 bottom-1 -z-10 h-3 -rotate-1 bg-amber-200 dark:bg-amber-300/70" />
            </span>{" "}
            and Events Come{" "}
            <span className="relative z-0 inline-block px-1">
              Alive
              <span className="absolute inset-x-0 bottom-1 -z-10 h-3 rotate-1 bg-teal-200 dark:bg-teal-300/60" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Gatherly helps organizations, clubs, creators, and teams manage communities, organize events, and keep members engaged—all from one beautiful platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/communities/create"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:bg-teal-700 hover:shadow-md"
            >
              <Users className="h-4 w-4" />
              Create Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:bg-accent hover:text-accent-foreground"
            >
              <Radar className="h-4 w-4 text-primary" />
              Explore Events
            </Link>
          </div>
        </div>

        <div className="relative min-h-82 overflow-hidden rounded-xl  bg-card shadow-xl shadow-slate-900/50 sm:min-h-90 lg:h-full lg:min-h-[calc(100svh-4rem)]">
          <img
            src={communityImage}
            alt="Friends enjoying time together outdoors"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-200">Real connections</p>
            <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-tight sm:text-3xl">
              Find your people. Make it meaningful.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">
              Discover communities and moments worth showing up for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
