import React, { useState } from "react";
import { Bell, LogOut, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../store/notificationStore";

export const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    addNotification("success", "Logged out successfully");
    navigate("/login");
  };

  const handleProfileSettings = () => {
    setIsProfileOpen(false);
    navigate("/profile");
  };

  if (!user) return null;

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-[#404040] dark:bg-[#1a1a1a]">
      {/* Left side - spacer */}
      <div className="flex-1" />

      {/* Right side - User actions */}
      <div className="flex items-center gap-4">
        {/* Notifications (future-proof) */}
        <button
          className="relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-[#404040] dark:hover:text-gray-50"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {/* Notification badge placeholder */}
          {/* <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F59E0B] rounded-full" /> */}
        </button>

        {/* Profile Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1a1a1a]"
            aria-label="Profile menu"
          >
            <User size={20} className="text-white" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-[#404040] dark:bg-[#1a1a1a]"
                >
                  {/* User Info Section */}
                  <div className="border-b border-zinc-200 bg-zinc-50 p-4 dark:border-[#404040] dark:bg-[#252525]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#F59E0B]">
                          {formatRole(user.role)}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2">
                    <button
                      onClick={handleProfileSettings}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-200 dark:hover:bg-[#404040] dark:hover:text-gray-50"
                    >
                      <Settings size={16} className="text-zinc-500 dark:text-gray-400" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-red-600 dark:text-gray-200 dark:hover:bg-[#404040] dark:hover:text-red-400"
                    >
                      <LogOut size={16} className="text-zinc-500 dark:text-gray-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
