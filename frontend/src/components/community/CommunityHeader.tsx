import { useRef } from "react";
import { ArrowUpDown, Search, Tag, X } from "lucide-react";
import {
  COMMUNITY_CATEGORIES,
  FieldClass,
  SORT_OPTIONS,
} from "../../constant.ts";
import type { CommunityCategory } from "../../types/community.ts";
import type { SortBy } from "../../types";

type SelectWithPicker = HTMLSelectElement & { showPicker?: () => void };

const openSelect = (ref: React.RefObject<SelectWithPicker | null>) => {
  const el = ref.current;
  if (!el) return;

  if (typeof el.showPicker === "function") {
    try {
      el.showPicker();
      return;
    } catch {
      // fall through to click fallback
    }
  }

  el.focus();
  el.click();
};

type CommunityHeaderProps = {
  title: string;
  description?: string;
  search: string;
  onChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: CommunityCategory | "") => void;
  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
};

const CommunityHeader = ({
  title,
  description = "Discover and join communities that share your interests, passions, and goals.",
  search,
  onChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
}: CommunityHeaderProps) => {
  const categoryRef = useRef<SelectWithPicker>(null);
  const sortByRef = useRef<SelectWithPicker>(null);

  return (
    <div>
      {/* Banner */}
      <div className="relative h-56 md:h-64 flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: 'url("/banner-img.svg")',
          }}
        />

        {/* Greenish shade overlay */}
        <div className="absolute inset-0 bg-emerald-900/50" />

        {/* Banner content */}
        <div className="relative z-10 flex items-center justify-between w-full px-6 md:px-10">
          <div className="font-heading  text-left space-y-2">
            <h1 className="text-3xl lg:text-5xl font-semibold tracking-widest text-white">
              {title}
            </h1>
            <p className="text-sm md:text-base text-teal-100 max-w-xl">
              {description}
            </p>
          </div>

          {/* Reserved space for future images/PNGs */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Search + filters row */}
      <div className="flex items-center justify-between flex-wrap gap-3  p-4 max-w-7xl mx-auto">
        <div className={`${FieldClass.formClass} bg-slate-100 flex-1`}>
          <Search className="w-4 h-4" />

          <input
            type="text"
            placeholder="Search communities..."
            value={search}
            onChange={(e) => onChange(e.target.value)}
            className={`${FieldClass.inputClass} text-xl`}
          />
          {search && (
            <button
              type="button"
              className="p-1 rounded-md bg-teal-100"
              onClick={() => onChange("")}
            >
              <X className="w-4 h-4 text-cyan-700" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 flex-wrap ml-auto">
          <div className={FieldClass.filterClass}>
            <Tag
              className="w-6 h-6 text-teal-900 cursor-pointer"
              onClick={() => openSelect(categoryRef)}
            />
            <select
              ref={categoryRef}
              name="category"
              value={category}
              onChange={(e) =>
                onCategoryChange(e.target.value as CommunityCategory | "")
              }
              className={`${FieldClass.selectClass}`}
            >
              <option value="">All</option>

              {COMMUNITY_CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={FieldClass.filterClass}>
            <ArrowUpDown
              className="w-6 h-6 text-teal-900 cursor-pointer"
              onClick={() => openSelect(sortByRef)}
            />
            <select
              ref={sortByRef}
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
  );
};

export default CommunityHeader;
