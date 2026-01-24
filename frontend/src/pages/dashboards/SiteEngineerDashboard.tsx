import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  ClipboardList,
  Clock,
  Upload,
  CheckCircle2,
  AlertCircle,
  Camera,
} from "lucide-react";

interface TaskItemProps {
  title: string;
  projectName: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  projectName,
  dueDate,
  priority,
  status,
}) => {
  const priorityConfig = {
    high: { color: "text-red-500", bg: "bg-red-500/10" },
    medium: { color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    low: { color: "text-green-500", bg: "bg-green-500/10" },
  };

  const statusConfig = {
    pending: { icon: Clock, color: "text-gray-400" },
    "in-progress": { icon: AlertCircle, color: "text-[#F59E0B]" },
    completed: { icon: CheckCircle2, color: "text-green-500" },
  };

  const priorityStyle = priorityConfig[priority];
  const statusStyle = statusConfig[status];
  const StatusIcon = statusStyle.icon;

  return (
    <Card padding="md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon size={16} className={statusStyle.color} />
            <h3 className="text-base font-semibold text-gray-50">{title}</h3>
          </div>
          <p className="text-sm text-gray-400">{projectName}</p>
        </div>
        <div className={`px-2 py-1 rounded ${priorityStyle.bg}`}>
          <span className={`text-xs font-medium ${priorityStyle.color}`}>
            {priority.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock size={14} />
          <span>Due: {dueDate}</span>
        </div>
        {status !== "completed" && (
          <Button variant="primary" size="sm">
            Update
          </Button>
        )}
      </div>
    </Card>
  );
};

export const SiteEngineerDashboard: React.FC = () => {
  // Mock data - Phase 3 will fetch from API
  const tasks = [
    {
      title: "Foundation Quality Check",
      projectName: "Highway Construction Phase 1",
      dueDate: "Jan 26, 2026",
      priority: "high" as const,
      status: "in-progress" as const,
    },
    {
      title: "Material Inspection - Steel Beams",
      projectName: "Bridge Renovation Project",
      dueDate: "Jan 27, 2026",
      priority: "high" as const,
      status: "pending" as const,
    },
    {
      title: "Progress Report Submission",
      projectName: "Urban Infrastructure Upgrade",
      dueDate: "Jan 28, 2026",
      priority: "medium" as const,
      status: "pending" as const,
    },
    {
      title: "Safety Equipment Audit",
      projectName: "Highway Construction Phase 1",
      dueDate: "Jan 25, 2026",
      priority: "low" as const,
      status: "completed" as const,
    },
  ];

  const pendingUpdates = [
    { id: 1, milestone: "Foundation completion - Site A", days: 2 },
    { id: 2, milestone: "Concrete pouring - Site B", days: 1 },
    { id: 3, milestone: "Quality inspection - Site C", days: 3 },
  ];

  const stats = [
    { label: "Assigned Tasks", value: tasks.length, icon: ClipboardList },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: AlertCircle,
    },
    {
      label: "Completed Today",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: CheckCircle2,
    },
    { label: "Pending Updates", value: pendingUpdates.length, icon: Upload },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">My Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Track your assigned tasks and update progress
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="md">
            <Camera size={18} className="mr-2" />
            Upload Photo
          </Button>
          <Button variant="primary" size="md">
            <Upload size={18} className="mr-2" />
            Update Progress
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-50">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
                  <Icon size={24} className="text-[#F59E0B]" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-50">My Tasks</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-[#F59E0B] text-[#0f0f0f] rounded-lg">
                All
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-50 hover:bg-[#404040] rounded-lg transition-colors">
                Pending
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-50 hover:bg-[#404040] rounded-lg transition-colors">
                Completed
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <TaskItem key={idx} {...task} />
            ))}
          </div>
        </div>

        {/* Sidebar - Pending Updates */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-50">
            Pending Updates
          </h2>
          <Card padding="md">
            <div className="space-y-4">
              {pendingUpdates.map((item) => (
                <div
                  key={item.id}
                  className="pb-4 border-b border-[#404040] last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                      <AlertCircle size={16} className="text-[#F59E0B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-50">{item.milestone}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Update due in {item.days} days
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="w-full mt-3">
                    Update Now
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Recent Activity
            </h3>
            <Card padding="md">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Completed safety audit - 2h ago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>Updated progress - Site A - 5h ago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Uploaded milestone photo - 1d ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
