import {ServicesCards} from "../../constant.ts";


export const Services = () => {

    return (
        <section
            className="relative w-screen min-h-screen p-8 md:p-20 bg-forest overflow-hidden max-w-430 mx-auto m-2 rounded-md text-lavender">
            <div className=" space-y-14">
                <h2 className={"text-white text-5xl"}>
                    Everything You Need to Run a Community
                </h2>
                <p className={"text-stone text-xl max-w-4xl"}>
                    From creating communities to organizing events and managing members, Gatherly provides all the tools
                    you need to build an active and organized community.
                </p>

                <div
                    className={"grid grid-cols-1 grid-rows-1 lg:grid-cols-2 xl:grid-cols-12 lg:grid-rows-4 gap-4 text-slate "}>
                    {
                        ServicesCards.map((service, index) => (
                            <div
                                key={index}
                                className={`    relative overflow-hidden
    ${service.class1}
    bg-light-ocean
    border-4 border-stone hover:border-orchid
    rounded-sm p-8 min-h-70

    group
  `}
                            >
                                {/* Gradient layer */}
                                <div
                                    className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0  transition-opacity duration-500  group-hover:opacity-100`} />

                                {/* Content */}
                                <div className={`relative group z-10 h-full flex flex-col justify-between transition duration-300 ${service.class2}`}>
                                    <h3 className="text-5xl font-heading transition-transform duration-500 ease-out group-hover:translate-y-4">
                                        {service.title}
                                    </h3>

                                    <p className="text-xl font-light transition-transform duration-500 ease-out group-hover:-translate-y-4">
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
