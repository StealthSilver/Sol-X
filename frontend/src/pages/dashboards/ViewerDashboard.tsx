import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FileText, TrendingUp, Calendar, Download, Eye } from "lucide-react";

interface ReportCardProps {
  title: string;
  projectName: string;
  date: string;
  type: "progress" | "financial" | "safety";
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  projectName,
  date,
  type,
}) => {
  const typeConfig = {
    progress: { color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    financial: { color: "text-green-500", bg: "bg-green-500/10" },
    safety: { color: "text-red-500", bg: "bg-red-500/10" },
  };

  const config = typeConfig[type];

  return (
    <Card padding="md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className={`inline-block px-2 py-1 rounded mb-2 ${config.bg}`}>
            <span className={`text-xs font-medium ${config.color}`}>
              {type.toUpperCase()}
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-50 mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{projectName}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#404040]">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Eye size={14} className="mr-1" />
            View
          </Button>
          <Button variant="secondary" size="sm">
            <Download size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const ViewerDashboard: React.FC = () => {
  // Mock data - Phase 3 will fetch from API
  const reports = [
    {
      title: "Monthly Progress Report - January",
      projectName: "Highway Construction Phase 1",
      date: "Jan 20, 2026",
      type: "progress" as const,
    },
    {
      title: "Q4 Financial Summary",
      projectName: "Bridge Renovation Project",
      date: "Jan 15, 2026",
      type: "financial" as const,
    },
    {
      title: "Safety Compliance Audit",
      projectName: "Urban Infrastructure Upgrade",
      date: "Jan 18, 2026",
      type: "safety" as const,
    },
    {
      title: "Weekly Progress Update",
      projectName: "Highway Construction Phase 1",
      date: "Jan 22, 2026",
      type: "progress" as const,
    },
  ];

  const projectSummary = [
    { name: "Highway Construction Phase 1", completion: 75, status: "Active" },
    { name: "Bridge Renovation Project", completion: 45, status: "Active" },
    {
      name: "Urban Infrastructure Upgrade",
      completion: 100,
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-50">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          View project progress and access reports
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projectSummary.length}
              </p>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
              <TrendingUp size={24} className="text-[#F59E0B]" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projectSummary.filter((p) => p.status === "Active").length}
              </p>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
              <TrendingUp size={24} className="text-[#F59E0B]" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Completed</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projectSummary.filter((p) => p.status === "Completed").length}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp size={24} className="text-green-500" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Available Reports</p>
              <p className="text-2xl font-semibold text-gray-50">
                {reports.length}
              </p>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
              <FileText size={24} className="text-[#F59E0B]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-50">
              Recent Reports
            </h2>
            <button className="text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {reports.map((report, idx) => (
              <ReportCard key={idx} {...report} />
            ))}
          </div>
        </div>

        {/* Sidebar - Project Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-50">
            Project Overview
          </h2>
          <Card padding="md">
            <div className="space-y-4">
              {projectSummary.map((project, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-[#404040] last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-50">
                      {project.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-50">
                        {project.completion}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#404040] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Access */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Quick Access
            </h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start"
              >
                <FileText size={18} className="mr-2" />
                All Reports
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start"
              >
                <Download size={18} className="mr-2" />
                Download Archive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
