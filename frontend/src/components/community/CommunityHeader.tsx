import {ArrowUpDown, Search, Tag, X} from 'lucide-react'
import {COMMUNITY_CATEGORIES, FieldClass, SORT_OPTIONS} from "../../constant.ts"
import type {CommunityCategory} from "../../types/community.ts";
import type {SortBy} from "../../types";


type CommunityHeaderProps = {
    title: string
    search: string
    onChange: (value: string) => void
    category: string
    onCategoryChange: (value: CommunityCategory | "") => void
    sortBy: SortBy
    onSortByChange: (value: SortBy) => void
}

const CommunityHeader = ({
                             title,
                             search,
                             onChange,
                             category,
                             onCategoryChange,
                             sortBy,
                             onSortByChange
                         }: CommunityHeaderProps) => {
    return (
        <div className="relative p-8 bg-lavender overflow-hidden">
            {/* Background image layer */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                    backgroundImage: 'url("/banner.png")',
                }}
            />

            {/* Content layer */}
            <div className="relative z-10 space-y-8">
                <h1 className="text-2xl lg:text-4xl font-semibold tracking-widest text-night ">
                    {title}
                </h1>

                {/* Search + filters row */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="relative w-full flex items-center gap-2 bg-night p-2 md:max-w-sm lg:max-w-md text-fog">

                        <Search className="w-4 h-4" />

                        <input
                            type="text"
                            placeholder="Search communities..."
                            value={search}
                            onChange={(e) => onChange(e.target.value)}
                            className={"outline-none border-0  flex-1"}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap ml-auto">
                        <div className={FieldClass.filterClass}>
                            <Tag className="w-4 h-4 text-gray-400 dark:text-stone pointer-events-none" />
                            <select
                                name="category"
                                value={category}
                                onChange={(e) =>
                                    onCategoryChange(e.target.value as CommunityCategory | "")
                                }
                                className={`${FieldClass.selectClass}`}
                            >
                                <option value="">All</option>

                                {COMMUNITY_CATEGORIES.map(({ value, label }) => (
                                    <option key={value} value={value} >
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={FieldClass.filterClass}>
                            <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-stone pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => onSortByChange(e.target.value as SortBy)}
                                className={FieldClass.selectClass}
                            >
                                {SORT_OPTIONS.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityHeader