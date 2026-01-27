import React, { useState, createContext, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { getNavigationForRole } from "../../lib/navigation";

// Context for sidebar collapsed state
interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  if (!user) return null;

  const navItems = getNavigationForRole(user.role);

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-[#404040] relative">
      {/* Logo */}
      <div
        className={`h-16 flex items-center border-b border-[#404040] ${collapsed ? "justify-center px-2" : "px-6"}`}
      >
        {collapsed ? (
          <img src="/icon.svg" alt="Sol-X" className="h-8 w-8" />
        ) : (
          <img src="/solx-logo.svg" alt="Sol-X" className="h-8" />
        )}
      </div>

      {/* Collapse Toggle Button - Desktop only */}
      <button
        onClick={() => setIsCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#404040] items-center justify-center text-gray-400 hover:text-gray-50 hover:bg-[#404040] transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav
        className={`flex-1 py-6 space-y-1 overflow-y-auto ${collapsed ? "px-2" : "px-4"}`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-colors duration-200 ${
                  collapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3"
                } ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                    : "text-gray-200 hover:bg-[#404040] hover:text-gray-50"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
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
      <motion.aside
        className="hidden lg:block h-screen sticky top-0"
        initial={false}
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <SidebarContent collapsed={isCollapsed} />
      </motion.aside>

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
              <SidebarContent collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
