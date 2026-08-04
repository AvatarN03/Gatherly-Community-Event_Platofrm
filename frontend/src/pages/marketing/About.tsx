import { Link } from "react-router-dom";

import {
  ArrowRight,
  GitBranch,
} from "lucide-react";

import { Aboutapproach, Aboutgoals, Aboutvalues } from "../../constant";

export default function About() {

  return (
    <main className="bg-night/40 text-fog">
      {/* Hero Section */}
      <section className="border-t-0 border-slate/10 dark:border-mist/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-display text-xs tracking-[0.25em] uppercase text-orchid mb-4">
              About Gatherly
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              Community management,
              <br />
              <span className="text-orchid">built for people who gather.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-mist/70 leading-relaxed">
              Gatherly is a community-driven event management platform where people
              create communities, organize events, manage memberships, and
              collaborate through secure role-based access.
            </p>
          </div>
          <div className="mt-14">
            {/* Constellation */}
            <svg
              viewBox="0 0 320 80"
              className="w-64 md:w-80 h-auto mx-auto text-orchid"
              aria-hidden="true"
            >
              <g stroke="currentColor" strokeWidth="1" opacity="0.35">
                <line x1="30" y1="40" x2="100" y2="20" />
                <line x1="30" y1="40" x2="100" y2="60" />
                <line x1="100" y1="20" x2="160" y2="40" />
                <line x1="100" y1="60" x2="160" y2="40" />
                <line x1="160" y1="40" x2="230" y2="18" />
                <line x1="160" y1="40" x2="230" y2="62" />
                <line x1="230" y1="18" x2="290" y2="40" />
                <line x1="230" y1="62" x2="290" y2="40" />
              </g>
              {[
                [30, 40, 0],
                [100, 20, 0.4],
                [100, 60, 0.8],
                [160, 40, 1.2],
                [230, 18, 0.6],
                [230, 62, 1],
                [290, 40, 0.2],
              ].map(([cx, cy, delay], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={i === 3 ? 6 : 4.5}
                  fill="currentColor"
                  className="animate-pulse"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="border-t border-mist/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-orchid mb-4">
            Our Philosophy
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-xl mb-12">
            What drives everything we build.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Aboutvalues.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-mist/10 bg-deep-ocean p-6 transition-all duration-300 hover:border-orchid/40 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
              >
                <div className="w-11 h-11 rounded-xl bg-orchid/10 text-orchid flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-mist mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-mist/60 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Achieve It Section */}
      <section className="border-t border-mist/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-orchid mb-4">
            How We Achieve It
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-xl mb-12">
            Technology that makes community management effortless.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Aboutapproach.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-mist/10 bg-deep-ocean p-6 transition-all duration-300 hover:border-orchid/40 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
              >
                <div className="w-11 h-11 rounded-xl bg-orchid/10 text-orchid flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-mist mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-mist/60 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="border-t border-mist/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-orchid mb-4">
            Our Vision
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-xl mb-12">
            Where we're heading.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Aboutgoals.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-mist/10 bg-deep-ocean p-6 transition-all duration-300 hover:border-orchid/40 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
              >
                <div className="w-11 h-11 rounded-xl bg-orchid/10 text-orchid flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-mist mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-mist/60 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="border-t border-mist/10">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto rounded-2xl border border-mist/10 bg-deep-ocean p-7 transition-all duration-300 hover:border-orchid/40 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.15)] flex items-center gap-5">
            <div className="w-14 h-14 shrink-0 rounded-full bg-orchid/15 text-orchid flex items-center justify-center font-display text-lg font-semibold">
              PN
            </div>
            <div>
              <h3 className="font-medium text-mist">
                Prashanth Naidu
              </h3>
              <p className="text-xs text-orchid mb-2">Full Stack Developer</p>
              <p className="text-sm text-mist/60 leading-relaxed">
                I enjoy building scalable web applications that combine intuitive
                user experiences with robust backend architecture. Gatherly was
                developed as a portfolio project to solve real-world community
                and event management challenges while exploring modern
                full-stack technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate/10 dark:border-mist/10 pb-28">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="rounded-3xl bg-night dark:bg-deep-ocean text-mist px-8 py-16 md:py-20 text-center relative overflow-hidden">
            <GitBranch className="w-6 h-6 text-orchid mx-auto mb-6" aria-hidden="true" />
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-4">
              Bring your people together.
            </h2>
            <p className="text-mist/60 max-w-md mx-auto mb-9">
              Explore what other communities are building, or start your own in
              a couple of minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/communities"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-mist/20 text-mist hover:border-mist/40 transition-colors text-sm font-medium"
              >
                Explore Communities
              </Link>
              <Link
                to="/communities/new"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orchid text-white hover:bg-orchid/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                Create Your First Community
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
