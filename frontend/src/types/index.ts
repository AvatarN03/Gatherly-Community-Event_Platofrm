import type { LucideIcon } from "lucide-react";
import type { SORT_OPTIONS } from "../constant";


export interface NavSection {
  key: string;
  icon: LucideIcon;
  title: string;
  href?: string;
  subItems: NavItem[];
}

export interface NavItem {
  title: string;
  path: string;
  end?: boolean;
  icon: LucideIcon;
}




export type SortBy = typeof SORT_OPTIONS[number]["value"];
