import type { LucideIcon } from "lucide-react";
import type { Role } from "./auth";

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: Role[];
}

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}
