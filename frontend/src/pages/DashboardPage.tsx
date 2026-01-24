import React from "react";
import { useAuthStore } from "../store/authStore";
import { AdminDashboard } from "./dashboards/AdminDashboard";
import { ProjectManagerDashboard } from "./dashboards/ProjectManagerDashboard";
import { SiteEngineerDashboard } from "./dashboards/SiteEngineerDashboard";
import { ViewerDashboard } from "./dashboards/ViewerDashboard";

/**
 * Role-based Dashboard Router
 * Displays appropriate dashboard based on user role
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  // Route to appropriate dashboard based on role
  switch (user.role) {
    case "MASTER_ADMIN":
    case "ADMIN":
      return <AdminDashboard />;
    case "PROJECT_MANAGER":
      return <ProjectManagerDashboard />;
    case "SITE_ENGINEER":
      return <SiteEngineerDashboard />;
    case "VIEWER":
      return <ViewerDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default DashboardPage;
