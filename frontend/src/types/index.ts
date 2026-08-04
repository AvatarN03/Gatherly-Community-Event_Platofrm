import type { LucideIcon } from "lucide-react";


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
