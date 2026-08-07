import {
  Users,
  Calendar,
  Ticket,
  Shield,
  UserPlus,
  Search,
  LayoutDashboard,
  Crown,
  ShieldCheck,
  Clock,
  UserCheck,
  UserX,
  Mic2,
  HandHelping,
  Bell,
  Target,
  Lightbulb,
  MessageSquare,
  CalendarClock,
  BarChart3,
  Rocket,
  Smartphone,
  Zap,
  Server,
  Home,
  UsersRound,
  FolderKanban,
  Compass,
  CalendarRange,
  ClipboardCheck,
  Inbox, Settings, CalendarDays,
} from "lucide-react";
import type { NavSection } from "./types";

export const HomeNavLinks = [
  {
    name:"Home",
    title:"Home",
    link:"/#home",
    classes:"hidden lg:block"
  },
  {
    name:"Features",
    title:"Features",
    link:"/#features",
    classes:"hidden lg:block"
  },
  {
    name:"HTW",
    title:"How it Works",
    link:"/#htw",
    classes:"hidden lg:block"
  },
  {
    name:"About",
    link:"/about",
  },
  {
    name:"Contact",
    link:"/contact",
  },
]

export const SUBJECTS = [
  "General Inquiry",
  "Bug Report",
  "Feature Request",
  "Community Support",
  "Event Issue",
  "Account Issue",
  "Feedback",
  "Partnership",
  "Other",
];

export const PRIORITIES = ["Low", "Medium", "High"];

export const Aboutvalues = [
  {
    icon: Users,
    title: "Community First",
    body: "Every feature is designed to bring people together and foster meaningful connections.",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    body: "We build tools that serve real community needs, not just feature checklists.",
  },
  {
    icon: Lightbulb,
    title: "Simple & Intuitive",
    body: "Powerful functionality wrapped in an experience that anyone can use.",
  },
];

export const Aboutapproach = [
  {
    icon: Server,
    title: "Modern Architecture",
    body: "Built with Node.js, Express, and PostgreSQL for reliability and scalability.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    body: "Clerk authentication and role-based permissions keep communities safe.",
  },
  {
    icon: Zap,
    title: "Event-Driven",
    body: "Background jobs via Inngest handle notifications and automation seamlessly.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experience",
    body: "Works flawlessly on desktop, tablet, and mobile devices.",
  },
];

// What we're building towards
export const Aboutgoals = [
  {
    icon: MessageSquare,
    title: "Real-Time Engagement",
    body: "Live chat and instant notifications to keep communities active.",
  },
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    body: "Calendar integrations and smart event recommendations.",
  },
  {
    icon: BarChart3,
    title: "Community Analytics",
    body: "Insights to help organizers understand and grow their communities.",
  },
  {
    icon: Rocket,
    title: "Mobile Experience",
    body: "Native mobile apps for iOS and Android coming soon.",
  },
];

// --

export const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Communities",
    path: "/communities",
    icon: UsersRound,
  },
  {
    title: "Events",
    path: "/communities",
    icon: CalendarDays,
  },
  {
    title: "Members",
    path: "/members",
    icon: UsersRound,
  }
];

export const ServicesCards  = [
  {
    title:"Community Management",
    description:"Create public or private communities with custom branding, descriptions, categories, and cover images. Keep everything organized in one dedicated space.",
    color: "from-sky-200 via-cyan-100 to-white",
    class1:"col-span-8 ",
    class2:"flex-col-reverse"
  },
  {
    title:"Event Planning",
    description:"Schedule online or offline events with detailed information, locations, participant limits, and registration controls.",
    color: "from-violet-200 via-fuchsia-100 to-white",
    class1:"col-span-4 row-span-2"
  },
  {
    title:"Member Management",
    description:"Manage memberships, approve join requests, assign roles, and keep your community organized as it grows.",
    color: "from-emerald-200 via-teal-100 to-white",
    class1:"col-span-4 row-span-2 "
  },
  {
    title:"Role-Based Permissions",
    description:"Give owners, administrators, coordinators, and members the right level of access with built-in role management.",
    color: "from-sky-200 via-cyan-100 to-white",
    class1:" col-span-4 row-span-2",
    class2:"flex-col-reverse"
  },
  {
    title:"Activity Feed",
    description:"Keep members informed with a real-time activity timeline showing community updates, new events, announcements, and important actions.",
    color: "from-emerald-200 via-teal-100 to-white",
    class1:"col-span-4 row-span-2"
  },
  {
    title:"Event Registration",
    description:"Allow members to register for events, track attendance, and manage participant lists effortlessly.",
    color: "from-violet-200 via-fuchsia-100 to-white",
    class1:"col-span-8"
  },

]

export const HTW_Steps = [
  {
    icon: "🏡",
    title: "Create a Community",
    desc: "Launch your own public or private community with custom branding, categories, and member settings.",
    side: "left",
    position: "top-[10%]",
  },
  {
    icon: "📅",
    title: "Organize Events",
    desc: "Schedule online or offline events, set participant limits, locations, and registration rules.",
    side: "right",
    position: "top-[30%]",
  },
  {
    icon: "🙋",
    title: "Members Join",
    desc: "People discover your community, request to join, register for events, and become active participants.",
    side: "left",
    position: "top-[54%]",
  },
  {
    icon: "🎉",
    title: "Engage & Grow",
    desc: "Manage members, share updates, host more events, and build a thriving community over time.",
    side: "right",
    position: "top-[73%]",
  },
];

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
] as const;

export const COMMUNITY_CATEGORIES = [
  { value: "General", label: "General" },
  { value: "Technology", label: "Technology" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Sports", label: "Sports" },
  { value: "Arts", label: "Arts" },
  { value: "Business", label: "Business" },
  { value: "Environment", label: "Environment" },
  { value: "Food", label: "Food" },
  { value: "Gaming", label: "Gaming" },
  { value: "Music", label: "Music" },
  { value: "Travel", label: "Travel" },
  { value: "Others", label: "Others" },
] as const;

export const SKELETON_COUNT = 9;