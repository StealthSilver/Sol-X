import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { getNavigationForRole } from "../../lib/navigation";

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) return null;

  const navItems = getNavigationForRole(user.role);

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-[#404040]">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#404040]">
        <h1 className="text-xl font-semibold text-[#F59E0B]">Sol-X</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                    : "text-gray-200 hover:bg-[#404040] hover:text-gray-50"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Role Badge */}
      <div className="px-6 py-4 border-t border-[#404040]">
        <div className="px-3 py-2 rounded-lg bg-[#0f0f0f]">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Your Role
          </p>
          <p className="text-sm text-gray-50 font-medium mt-1">
            {user.role.replace(/_/g, " ")}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1a1a1a] border border-[#404040] text-gray-50"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[260px] z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
