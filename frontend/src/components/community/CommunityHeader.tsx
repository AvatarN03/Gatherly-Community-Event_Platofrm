import { ArrowUpDown, Grid2X2, Search, X } from "lucide-react";
import { COMMUNITY_CATEGORIES, SORT_OPTIONS } from "../../constant.ts";
import type { CommunityCategory } from "../../types/community.ts";
import type { SortBy } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type CommunityTab = "all" | "my" | "managed" | "joined";

type CommunityHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  search: string;
  onChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: CommunityCategory | "") => void;
  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
};

const FilterSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
  ariaLabel,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  ariaLabel: string;
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger aria-label={ariaLabel}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const CommunityHeader = ({
  title,
  eyebrow = "EXPLORE & CONNECT",
  description = "Discover like-minded people, join communities, and be part of something bigger.",
  search,
  onChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
}: CommunityHeaderProps) => {
  return (
    <div className="bg-background">
      <div className="relative isolate min-h-[250px] overflow-hidden border-b border-border bg-accent/30 px-6 py-10 sm:px-10 lg:px-14">
        <div className="absolute -right-8 -top-36 h-[440px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <img
          src="https://images.unsplash.com/photo-1768776183581-22b35cae3e6e?auto=format&fit=crop&w=1400&q=80"
          alt="People gathering outdoors"
          className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-50 dark:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background/5" />
        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 pb-5 pt-4 sm:px-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search bar */}
          <div className="flex h-10 flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 text-card-foreground shadow-sm focus-within:ring-2 focus-within:ring-ring">
            <Search className="h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="Search communities, topics, or people..."
              value={search}
              onChange={(e) => onChange(e.target.value)}
              className="w-full min-w-0 appearance-none bg-transparent text-xs text-card-foreground outline-none placeholder:text-muted-foreground"
            />
            {search && (
              <button
                type="button"
                className="cursor-pointer rounded-md p-1 text-primary hover:bg-accent"
                onClick={() => onChange("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter controls */}
          <div className="flex gap-2">
            {/* Category select */}
            <div className="flex min-w-36 flex-1 items-center gap-2">
              <Grid2X2 className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <FilterSelect
                  ariaLabel="Filter communities by category"
                  value={category}
                  onValueChange={(value) =>
                    onCategoryChange(value as CommunityCategory | "")
                  }
                  placeholder="Categories"
                  options={[
                    { value: "", label: "All Categories" },
                    ...COMMUNITY_CATEGORIES,
                  ]}
                />
              </div>
            </div>

            {/* Sort select — icon instead of text label */}
            <div className="flex min-w-32 flex-1 items-center gap-2">
              <ArrowUpDown className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <FilterSelect
                  ariaLabel="Sort communities"
                  value={sortBy}
                  onValueChange={(value) => onSortByChange(value as SortBy)}
                  placeholder="Sort by"
                  options={SORT_OPTIONS.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
