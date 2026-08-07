import type {CommunityTab} from "./community/CommunityHeader.tsx";

const TABS: { value: CommunityTab; label: string }[] = [
    {value: 'all', label: 'All'},
    {value: 'my', label: 'My'},
    {value: 'managed', label: 'Managed'},
    {value: 'joined', label: 'Joined'},
]


const Tabs = (
    {onTabChange, tab}: { onTabChange: (value: CommunityTab) => void ,tab: CommunityTab }) => {
    return (
        <div className="flex justify-between border-b-2 px-4 p-2">
            <p>Filter:</p>
            <div className="flex items-center bg-light-ocean gap-2  border border-stone/40 p-1">
                {TABS.map(({value, label}) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onTabChange(value)}
                        className={`px-3.5 py-1.5 text-xs font-medium  transition-colors duration-200 ${
                            tab === value
                                ? 'bg-night text-lavender border border-lavender/40'
                                : ' hover:bg-stone/30 border border-transparent'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
};

export default Tabs;