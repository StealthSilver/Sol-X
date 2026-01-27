import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ToastContainer } from "../ui/ToastContainer";

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0f0f0f] text-gray-50 flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0 transition-all duration-300">
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Global Toast Notifications */}
        <ToastContainer />
      </div>
    </SidebarProvider>
  );
};
