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
  Inbox,
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


export const sections: NavSection[] = [
  {
    key: "home",
    icon: Home,
    title: "Overview",
    href: "/dashboard",
    subItems: [
      {
        title: "Dashboard",
        path: "/dashboard",
        end: true,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    key: "Communities",
    icon: UsersRound,
    title: "Communities",
    subItems: [
      { title: "My", path: "/communities/my", end: true, icon: FolderKanban },
      {
        title: "Managed",
        path: "/communities/managed",
        end: true,
        icon: ShieldCheck,
      },
      {
        title: "Joined",
        path: "/communities/joined",
        end: true,
        icon: UserCheck,
      },
      { title: "Browse", path: "/communities", end: true, icon: Compass },
    ],
  },
  {
    key: "Events",
    icon: CalendarRange,
    title: "Events",
    subItems: [
      { title: "My", path: "/events/my", end: true, icon: Calendar },
      {
        title: "Registered",
        path: "/events/registered",
        end: true,
        icon: Ticket,
      },
      {
        title: "Assigned",
        path: "/events/assigned",
        end: true,
        icon: ClipboardCheck,
      },
      { title: "Browse", path: "/events", end: true, icon: Search },
    ],
  },
  {
    key: "Admin",
    icon: Inbox,
    title: "Admin",
    subItems: [
      {
        title: "Community Requests",
        path: "/dashboard/communities-requests",
        icon: Inbox,
      },
    ],
  },
];
