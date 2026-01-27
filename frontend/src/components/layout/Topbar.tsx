import React, { useState } from "react";
import { Bell, ChevronDown, LogOut } from "lucide-react";
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

  if (!user) return null;

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

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#404040] transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-50">{user.name}</p>
              <p className="text-xs text-gray-400">
                {user.role.replace(/_/g, " ")}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl overflow-hidden z-20"
                >
                  <div className="p-3 border-b border-[#404040]">
                    <p className="text-sm font-medium text-gray-50">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#404040] hover:text-gray-50 transition-colors"
                    >
                      <LogOut size={16} />
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
