import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  FileText,
  Calendar,
  FolderKanban,
  Download,
  Filter,
  Search,
} from "lucide-react";

type ReportTab = "overview" | "daily" | "weekly" | "monthly" | "project";

const ReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ReportTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle tab from URL params
  useEffect(() => {
    const tab = searchParams.get("tab") as ReportTab;
    if (
      tab &&
      ["overview", "daily", "weekly", "monthly", "project"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: ReportTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: FileText },
    { id: "daily" as const, label: "Daily", icon: Calendar },
    { id: "weekly" as const, label: "Weekly", icon: Calendar },
    { id: "monthly" as const, label: "Monthly", icon: Calendar },
    { id: "project" as const, label: "Project Reports", icon: FolderKanban },
  ];

  // Mock project data for project reports
  const projects = [
    {
      id: "1",
      name: "Highway Construction Phase 1",
      status: "on-track",
      lastReport: "Feb 8, 2026",
    },
    {
      id: "2",
      name: "Bridge Renovation Project",
      status: "delayed",
      lastReport: "Feb 7, 2026",
    },
    {
      id: "3",
      name: "Urban Infrastructure Upgrade",
      status: "completed",
      lastReport: "Feb 5, 2026",
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    const config = {
      "on-track": { color: "text-green-500", bg: "bg-green-500/10" },
      delayed: { color: "text-red-500", bg: "bg-red-500/10" },
      completed: { color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    }[status] || { color: "text-gray-500", bg: "bg-gray-500/10" };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
      >
        {status.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">Reports</h1>
          <p className="text-sm text-gray-400 mt-1">
            View and generate project reports
          </p>
        </div>
        <Button variant="primary">
          <Download size={18} className="mr-2" />
          Export All
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#404040] pb-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? "text-[#F59E0B] border-[#F59E0B]"
                : "text-gray-400 border-transparent hover:text-gray-200"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <Card padding="lg">
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">
              Reports Overview
            </h3>
            <p className="text-gray-400">
              View summary of all reports and analytics
            </p>
          </div>
        </Card>
      )}

      {(activeTab === "daily" ||
        activeTab === "weekly" ||
        activeTab === "monthly") && (
        <Card padding="lg">
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reports
            </h3>
            <p className="text-gray-400">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} report
              generation coming soon
            </p>
          </div>
        </Card>
      )}

      {activeTab === "project" && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <Card padding="md">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-[#404040] text-gray-100 placeholder-gray-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 focus-visible:border-[#F59E0B]"
                />
              </div>
              <Button variant="secondary">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </Card>

          {/* Project Reports List */}
          <div className="space-y-3">
            {filteredProjects.length === 0 ? (
              <Card padding="lg">
                <div className="text-center py-8">
                  <FolderKanban
                    size={48}
                    className="mx-auto text-gray-600 mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-200 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your search query
                  </p>
                </div>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  padding="md"
                  className="hover:border-[#F59E0B]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                        <FolderKanban size={20} className="text-[#F59E0B]" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-100">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Last report: {project.lastReport}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(project.status)}
                      <Button variant="secondary" size="sm">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
