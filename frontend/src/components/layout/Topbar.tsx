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
    <header className="h-16 bg-[#1a1a1a] border-b border-[#404040] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left side - spacer */}
      <div className="flex-1" />

      {/* Right side - User actions */}
      <div className="flex items-center gap-4">
        {/* Notifications (future-proof) */}
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-gray-50 hover:bg-[#404040] transition-colors relative"
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
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
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
                  className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl overflow-hidden z-20"
                >
                  {/* User Info Section */}
                  <div className="p-4 border-b border-[#404040] bg-[#252525]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#F59E0B]">
                          {formatRole(user.role)}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2">
                    <button
                      onClick={handleProfileSettings}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#404040] hover:text-gray-50 transition-colors"
                    >
                      <Settings size={16} className="text-gray-400" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#404040] hover:text-red-400 transition-colors"
                    >
                      <LogOut size={16} className="text-gray-400" />
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
