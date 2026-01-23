import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "MASTER_ADMIN":
        return "bg-purple-500/10 text-purple-400 border-purple-500/50";
      case "ADMIN":
        return "bg-blue-500/10 text-blue-400 border-blue-500/50";
      case "PROJECT_MANAGER":
        return "bg-green-500/10 text-green-400 border-green-500/50";
      case "SITE_ENGINEER":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50";
      case "VIEWER":
        return "bg-gray-500/10 text-gray-400 border-gray-500/50";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/50";
    }
  };

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <header className="bg-[#1E293B] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-gray-50">Sol-X</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-[#1E293B] rounded-lg p-8 shadow-lg mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-gray-50 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-400">
                You're logged in with {formatRole(user?.role || "")} access.
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium border rounded-full ${getRoleBadgeColor(
                user?.role || "",
              )}`}
            >
              {formatRole(user?.role || "")}
            </span>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-3">
              <svg
                className="w-5 h-5 text-[#F59E0B] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-400">Name</h3>
            </div>
            <p className="text-lg font-semibold text-gray-50">{user?.name}</p>
          </div>

          <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-3">
              <svg
                className="w-5 h-5 text-[#F59E0B] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-400">Email</h3>
            </div>
            <p className="text-lg font-semibold text-gray-50">{user?.email}</p>
          </div>

          <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-3">
              <svg
                className="w-5 h-5 text-[#F59E0B] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-400">Role</h3>
            </div>
            <p className="text-lg font-semibold text-gray-50">
              {formatRole(user?.role || "")}
            </p>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-[#10B981]/10 border border-[#10B981]/50 rounded-lg p-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-[#10B981] mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-[#10B981] mb-1">
                Authentication Successful
              </h3>
              <p className="text-gray-300 text-sm">
                You have successfully logged in to Sol-X. This is Phase 1 of the
                authentication system. Additional features and dashboards will
                be available in future phases.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
