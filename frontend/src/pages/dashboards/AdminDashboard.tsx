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
} from "lucide-react";

interface ProjectCardProps {
  name: string;
  completion: number;
  status: "on-track" | "delayed" | "completed";
  deadline: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  completion,
  status,
  deadline,
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
        <div>
          <h3 className="text-lg font-semibold text-gray-50">{name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">Due: {deadline}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full ${config.bg}`}>
          <span className={`text-xs font-medium ${config.color}`}>
            {status.replace("-", " ").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
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

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  change?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
}) => {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-semibold text-gray-50">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                size={14}
                className={change >= 0 ? "text-green-500" : "text-red-500"}
              />
              <span
                className={`text-xs ${
                  change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change}% from last month
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
          <Icon size={24} className="text-[#F59E0B]" />
        </div>
      </div>
    </Card>
  );
};

export const AdminDashboard: React.FC = () => {
  // Mock data - Phase 3 will fetch from API
  const projects = [
    {
      name: "Highway Construction Phase 1",
      completion: 75,
      status: "on-track" as const,
      deadline: "Feb 15, 2026",
    },
    {
      name: "Bridge Renovation Project",
      completion: 45,
      status: "delayed" as const,
      deadline: "Jan 30, 2026",
    },
    {
      name: "Urban Infrastructure Upgrade",
      completion: 100,
      status: "completed" as const,
      deadline: "Jan 10, 2026",
    },
  ];

  const delayedTasks = [
    { id: 1, task: "Foundation inspection - Site A", daysOverdue: 3 },
    { id: 2, task: "Material delivery - Site B", daysOverdue: 1 },
    { id: 3, task: "Safety audit - Site C", daysOverdue: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, here's what's happening today
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="md">
            <FileText size={18} className="mr-2" />
            View Reports
          </Button>
          <Button variant="primary" size="md">
            <Plus size={18} className="mr-2" />
            Create Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Projects"
          value={24}
          icon={FolderKanban}
          change={12}
        />
        <StatCard label="Active Projects" value={18} icon={TrendingUp} />
        <StatCard label="Completed" value={6} icon={TrendingUp} change={8} />
        <StatCard
          label="Delayed Tasks"
          value={delayedTasks.length}
          icon={AlertCircle}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ongoing Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-50">
              Ongoing Projects
            </h2>
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

        {/* Sidebar - Delayed Tasks */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-50">Delayed Tasks</h2>
          <Card padding="md">
            <div className="space-y-4">
              {delayedTasks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 pb-4 border-b border-[#404040] last:border-0 last:pb-0"
                >
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertCircle size={16} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-50">{item.task}</p>
                    <p className="text-xs text-red-500 mt-1">
                      {item.daysOverdue} days overdue
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {delayedTasks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">No delayed tasks</p>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Quick Actions
            </h3>
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-start"
            >
              <FolderKanban size={18} className="mr-2" />
              Manage Projects
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-start"
            >
              <FileText size={18} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
