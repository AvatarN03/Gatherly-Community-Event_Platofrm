import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import {HTW_Steps} from "../../constant.ts";



gsap.registerPlugin(ScrollTrigger)


export const HTW = () => {

    const stickyRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const stepRefs = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        ScrollTrigger.refresh();

        const ctx = gsap.context(() => {
            const totalHeight = stickyRef.current!.offsetHeight
            const stepCount = HTW_Steps.length

            stepRefs.current.forEach((el, i) => {
                const fromLeft = HTW_Steps[i].side === "left"

                // Spread each step evenly across the scroll distance
                // e.g. 4 steps → triggers at 0px, ~290px, ~580px, ~870px into the scroll
                const offset = (i / stepCount) * (totalHeight - window.innerHeight)

                gsap.fromTo(
                    el,
                    { opacity: 0, x: fromLeft ? -80 : 80 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stickyRef.current,
                            start: `top+=${offset}px top`,       // fires when this offset scrolls to top
                            end: `top+=${offset + 200}px top`,   // completes over 200px of scroll
                            toggleActions: "play none none reverse",
                            scrub: 0.5,  // optional: ties animation to scroll position
                        },
                    }
                )
            })
        }, stickyRef)

        return () => ctx.revert()
    }, [])


    return (
        <section id="htw" className="w-full min-h-dvh py-25 md:px-12 relative">

            <div className="w-full flex items-center gap-4 py-8 mb-8">
                {/* Left fading line */}
                <div className="flex-1 h-px bg-linear-to-r from-transparent to-orchid" />

                {/* Dot + Title + Dot */}
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orchid/70" />
                    <h2 className="text-forest text-3xl font-medium tracking-widest text-center">
                        How it works
                    </h2>
                    <span className="w-1.5 h-1.5 rounded-full bg-orchid/70" />
                </div>

                {/* Right fading line */}
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-orchid" />
            </div>

            {/* Sticky scroll section — tall enough to scroll through all steps */}
            <div
                ref={stickyRef}
                className="relative w-full"
                style={{ height: "320vh" }}
            >
                {/* Sticky image — fills the viewport and stays pinned */}
                <div
                    ref={imageRef}
                    className="sticky top-0 w-full h-screen overflow-hidden bg-fog p-2"
                >
                    <img
                        src="/gather.svg"
                        alt="Gatherly"
                        className="w-full h-full object-cover"
                    />

                    {/* Dark overlay so text is readable over the image */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Step cards float over the image */}
                    {HTW_Steps.map((step, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) stepRefs.current[i] = el }}
                            className={`
                absolute ${step.position} backdrop-blur-md  border-2 border-cocoa rounded-xl bg-fog/30 text-deep-ocean shadow-xl
                ${step.side === "left" ? "left-0 md:left-16 " : "right-0 md:right-16"}
                w-full md:max-w-120
              `}
                        >
                            <div className=" p-5 ">
                                <span className="text-xl md:text-3xl mb-3 block">{step.icon}</span>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl md:text-4xl font-bold bg-orchid/80 text-white rounded-full px-2 py-1.5">
                                        0{i + 1}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-semibold">{step.title}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-night">{step.desc}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>


        </section>
    )
}
