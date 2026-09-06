import {ServicesCards} from "../../constant.ts";

const serviceImages = [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
];

export const Services = () => {

    return (
        <section
            className="relative mx-auto min-h-screen w-full overflow-hidden bg-[var(--services-background)] px-5 py-14 text-[var(--services-text)] sm:px-8 md:px-14 md:py-20">
            <div className="space-y-10 md:space-y-14 max-w-[1400px] mx-auto">
                <h2 className={"max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[var(--services-text)] md:text-5xl"}>
                    Everything You Need to Run a Community
                </h2>
                <p className={"max-w-3xl text-base leading-7 text-[var(--services-muted)] md:text-lg"}>
                    From creating communities to organizing events and managing members, Gatherly provides all the tools
                    you need to build an active and organized community.
                </p>

                <div
                    className={"grid grid-cols-1 gap-5 text-slate md:grid-cols-2 xl:grid-cols-12"}>
                    {
                        ServicesCards.map((service, index) => (
                            <div
                                key={index}
                                className={`service-card group relative overflow-hidden
    ${service.class1}
    bg-[var(--services-card)] text-[var(--services-card-text)]
    border border-[var(--services-border)] hover:border-primary
    rounded-md p-6 min-h-64 shadow-sm shadow-black/10

  `}
                            >
                                <img
                                    src={serviceImages[index]}
                                    alt=""
                                    aria-hidden="true"
                                    className="service-card-image absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="service-card-scrim absolute inset-0" aria-hidden="true" />
                                <div
                                    className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 transition-opacity duration-500 group-hover:opacity-25`} />

                                {/* Content */}
                                <div className={`relative group z-10 h-full flex flex-col justify-between transition duration-300 ${service.class2}`}>
                                    <h3 className="text-3xl font-heading font-semibold tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-y-4 md:text-4xl">
                                        {service.title}
                                    </h3>

                                    <p className="text-base font-normal leading-7 text-[var(--services-card-muted)] transition-transform duration-500 ease-out group-hover:-translate-y-4">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )

}
