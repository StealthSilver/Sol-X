import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  FolderKanban,
  TrendingUp,
  AlertCircle,
  Calendar,
  Plus,
  FileText,
  Users,
} from "lucide-react";

interface ProjectCardProps {
  name: string;
  completion: number;
  status: "on-track" | "delayed" | "completed";
  deadline: string;
  teamSize: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  completion,
  status,
  deadline,
  teamSize,
}) => {
  const statusConfig = {
    "on-track": { color: "text-green-500", bg: "bg-green-500/10" },
    delayed: { color: "text-red-500", bg: "bg-red-500/10" },
    completed: { color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  };

  const config = statusConfig[status];

  return (
    <Card padding="md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-50 mb-2">{name}</h3>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Due: {deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{teamSize} members</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full ${config.bg}`}>
          <span className={`text-xs font-medium ${config.color}`}>
            {status.replace("-", " ").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-50">
            {completion}%
          </span>
        </div>
        <div className="h-2 bg-[#404040] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export const ProjectManagerDashboard: React.FC = () => {
  // Mock data - Phase 3 will fetch from API
  const projects: ProjectCardProps[] = [
    {
      name: "Highway Construction Phase 1",
      completion: 75,
      status: "on-track",
      deadline: "Feb 15, 2026",
      teamSize: 12,
    },
    {
      name: "Bridge Renovation Project",
      completion: 45,
      status: "delayed",
      deadline: "Jan 30, 2026",
      teamSize: 8,
    },
    {
      name: "Urban Infrastructure Upgrade",
      completion: 90,
      status: "on-track",
      deadline: "Feb 28, 2026",
      teamSize: 15,
    },
  ];

  const upcomingMilestones = [
    {
      id: 1,
      project: "Highway Construction",
      milestone: "Foundation completion",
      date: "Jan 28",
    },
    {
      id: 2,
      project: "Bridge Renovation",
      milestone: "Structural assessment",
      date: "Jan 30",
    },
    {
      id: 3,
      project: "Urban Infrastructure",
      milestone: "Final inspection",
      date: "Feb 5",
    },
  ];

  const teamActivity = [
    { name: "John Doe", action: "Updated progress - Site A", time: "2h ago" },
    { name: "Sarah Smith", action: "Uploaded milestone photo", time: "4h ago" },
    { name: "Mike Johnson", action: "Completed safety audit", time: "6h ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">
            Project Manager Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage projects, track team progress, and generate reports
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="md">
            <FileText size={18} className="mr-2" />
            Generate Report
          </Button>
          <Button variant="primary" size="md">
            <Plus size={18} className="mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projects.filter((p) => p.status !== "completed").length}
              </p>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
              <FolderKanban size={24} className="text-[#F59E0B]" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Team Members</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projects.reduce((sum, p) => sum + p.teamSize, 0)}
              </p>
            </div>
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
              <Users size={24} className="text-[#F59E0B]" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">On Track</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projects.filter((p) => p.status === "on-track").length}
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
              <p className="text-sm text-gray-400 mb-1">Delayed</p>
              <p className="text-2xl font-semibold text-gray-50">
                {projects.filter((p) => p.status === "delayed").length}
              </p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertCircle size={24} className="text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-50">My Projects</h2>
            <button className="text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Milestones */}
          <div>
            <h2 className="text-xl font-semibold text-gray-50 mb-4">
              Upcoming Milestones
            </h2>
            <Card padding="md">
              <div className="space-y-4">
                {upcomingMilestones.map((item) => (
                  <div
                    key={item.id}
                    className="pb-4 border-b border-[#404040] last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                        <Calendar size={16} className="text-[#F59E0B]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-50">
                          {item.milestone}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.project}
                        </p>
                        <p className="text-xs text-[#F59E0B] mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Team Activity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Recent Team Activity
            </h3>
            <Card padding="md">
              <div className="space-y-3">
                {teamActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-[#F59E0B]">
                        {activity.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-50">{activity.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
