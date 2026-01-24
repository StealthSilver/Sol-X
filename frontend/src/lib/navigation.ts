import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  Settings,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import type { NavigationItem } from "../types/navigation";
import type { Role } from "../types/auth";

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "MASTER_ADMIN",
      "ADMIN",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
      "VIEWER",
    ],
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
    roles: ["MASTER_ADMIN", "ADMIN", "PROJECT_MANAGER"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
    roles: [
      "MASTER_ADMIN",
      "ADMIN",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
      "VIEWER",
    ],
  },
  {
    label: "My Tasks",
    path: "/tasks",
    icon: ClipboardList,
    roles: ["SITE_ENGINEER"],
  },
  {
    label: "Update Progress",
    path: "/progress",
    icon: TrendingUp,
    roles: ["SITE_ENGINEER"],
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
    roles: ["MASTER_ADMIN", "ADMIN"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["MASTER_ADMIN", "ADMIN"],
  },
];

export const getNavigationForRole = (role: Role): NavigationItem[] => {
  return navigationItems.filter((item) => item.roles.includes(role));
};
