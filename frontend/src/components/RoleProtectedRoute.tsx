import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { type Role } from "../types/auth";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
