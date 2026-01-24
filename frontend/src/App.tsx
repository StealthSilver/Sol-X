import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/layout/AppLayout";

// Lazy load components
const Login = lazy(() => import("./pages/Login"));
const RequestAccess = lazy(() => import("./pages/RequestAccess"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const RoleProtectedRoute = lazy(
  () => import("./components/RoleProtectedRoute"),
);

// Dashboard pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));

// Loading fallback
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0f0f0f",
      color: "#FAFAFA",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #1a1a1a",
          borderTop: "4px solid #F59E0B",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px",
        }}
      />
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/request-access" element={<RequestAccess />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Protected Routes with AppLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard - All roles */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Projects - Admin, Project Manager */}
            <Route
              path="/projects"
              element={
                <RoleProtectedRoute
                  allowedRoles={["MASTER_ADMIN", "ADMIN", "PROJECT_MANAGER"]}
                >
                  <ProjectsPage />
                </RoleProtectedRoute>
              }
            />

            {/* Reports - All roles */}
            <Route path="/reports" element={<ReportsPage />} />

            {/* Tasks - Site Engineers only */}
            <Route
              path="/tasks"
              element={
                <RoleProtectedRoute allowedRoles={["SITE_ENGINEER"]}>
                  <TasksPage />
                </RoleProtectedRoute>
              }
            />

            {/* Progress Updates - Site Engineers only */}
            <Route
              path="/progress"
              element={
                <RoleProtectedRoute allowedRoles={["SITE_ENGINEER"]}>
                  <ProgressPage />
                </RoleProtectedRoute>
              }
            />

            {/* Users - Admin only */}
            <Route
              path="/users"
              element={
                <RoleProtectedRoute allowedRoles={["MASTER_ADMIN", "ADMIN"]}>
                  <UsersPage />
                </RoleProtectedRoute>
              }
            />

            {/* Settings - Admin only */}
            <Route
              path="/settings"
              element={
                <RoleProtectedRoute allowedRoles={["MASTER_ADMIN", "ADMIN"]}>
                  <SettingsPage />
                </RoleProtectedRoute>
              }
            />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
