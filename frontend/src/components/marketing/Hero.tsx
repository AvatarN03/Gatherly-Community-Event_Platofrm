import { Radar, Users } from "lucide-react"
import { Link } from "react-router-dom"


export const Hero = () => {
  return (
    <section id="home" className="w-full py-20 px-4 max-w-7xl mx-auto  h-dvh">
      <div className="relative w-full bg-forest p-12  space-y-25 before:absolute
    before:content-['']
    before:-inset-8
    before:border-4
    before:border-dashed
    before:border-night/40
    before:pointer-events-none">
        <h1 className="text-3xl md:text-6xl font-semibold leading-normal tracking-wide mb-6 text-center text-fog">
            Where Communities{" "} <br/>
            <span className="relative inline-block px-1.5 z-10 text-slate">
                Grow
                <span className="absolute inset-y-0.5 -inset-x-1 bg-amber-200 rounded-sm -z-10 rotate-[-1.5deg]" />
            </span>{" "}
            and Events <br/> Come {" "}
            <span className="relative inline-block px-1.5 z-10 text-slate">
              Alive
                <span className="absolute inset-y-0.5 -inset-x-1 bg-emerald-200 rounded-sm -z-10 rotate-[1.2deg]" />
            </span>
        </h1>

        <p className="text-mist max-w-3xl mx-auto text-center">Gatherly helps organizations, clubs, creators, and teams manage communities, organize events, and keep members engaged—all from one beautiful platform.</p>

        <div className="flex items-center md:items-center gap-2 md:gap-4 flex-col md:flex-row justify-center mt-8 md:mt-12">
            <Link to="/communities/create">
                <button className="inline-flex items-center gap-1 px-2 md:px-5 py-2.5 bg-night/70 text-fog text-md md:text-lg font-light md:font-medium rounded-sm hover:bg-night active:scale-[0.97] transition-all cursor-pointer border border-forest hover:border-cocoa">
                    <Users size={18} />
                    Create Community
                </button>
            </Link>
            <Link to="/events">
                <button className="inline-flex items-center gap-1 px-2 md:px-5 py-2.5 text-lavender text-md md:text-lg font-medium rounded-full border-3 border-fog hover:bg-cocoa hover:text-night hover:border-night active:scale-[0.97] transition-all cursor-pointer">
                    <Radar size={18} />
                    Explore Events
                </button>
            </Link>
        </div>


      </div>
    </section>
  )
}
