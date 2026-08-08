import { Link } from 'react-router-dom'
import { MapPin, Tag } from 'lucide-react'

const Card = ({ item }: any) => {
    const createdBy = item.createdBy;

    return (
        <Link
            to={`/communities/${item.slug}`}
            className="group relative block overflow-hidden border border-stone bg-night text-mist transition-all duration-300 hover:-translate-y-1.5 hover:border-orchid/60"
        >
            {/* Content — fixed height so cards line up regardless of title length */}
            <div className="flex h-28 flex-col justify-between gap-2 p-4">
                <h2 className="line-clamp-2 text-base font-medium text-mist transition-colors group-hover:text-purple-400">
                    {item.name}
                </h2>

                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 rounded-full border-2 border-lavender/50 px-2 py-0.5 text-xs text-mist/60">
                        <MapPin className="h-3 w-3 text-fog" />
                        {item.location}
                    </p>

                    <span className="flex items-center gap-1 text-xs text-mist/60">
                        <Tag className="h-3.5 w-3.5" />
                        {item.category}
                    </span>
                </div>
            </div>

            {/* Image — fixed height, full bleed, no padding */}
            <img
                src={item.imageUrl || "/image_holder.jpg"}
                alt={item.name}
                className="h-48 w-full object-cover"
            />

            {/* Created by — fixed height, same left alignment/padding as content */}
            {createdBy && (
                <div className="flex h-16 items-center gap-3 border-t border-stone/50 px-4">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                        <img
                            src={createdBy.imageUrl}
                            alt={createdBy.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="min-w-0">
                        <h4 className="truncate text-sm text-mist">{createdBy.name}</h4>
                        <p className="truncate text-xs text-mist/60">{createdBy.email}</p>
                    </div>
                </div>
            )}
        </Link>
    )
}

export default Card