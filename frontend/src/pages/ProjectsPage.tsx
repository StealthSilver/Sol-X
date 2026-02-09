import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, MapPin, Calendar, Zap } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CreateProjectDrawer } from "../components/projects/CreateProjectDrawer";
import { projectApi } from "../api/project.api";
import { useAuthStore } from "../store/authStore";
import type { Project, ProjectStatus } from "../types/project";
import { PROJECT_STATUSES } from "../types/project";

const ProjectsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const canCreateProject =
    user?.role === "MASTER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "PROJECT_MANAGER";

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await projectApi.getProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: ProjectStatus) => {
    const statusConfig = PROJECT_STATUSES.find((s) => s.value === status);
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusConfig?.color || "bg-gray-500"
        } text-white`}
      >
        {statusConfig?.label || status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all construction projects
          </p>
        </div>
        {canCreateProject && (
          <Button onClick={() => setIsDrawerOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        )}
      </div>

      {/* Search & Filters */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-[#404040] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
            />
          </div>
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="lg">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-700 rounded w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#404040] rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">
              No projects found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Get started by creating your first project"}
            </p>
            {canCreateProject && !searchQuery && (
              <Button onClick={() => setIsDrawerOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              padding="lg"
              className="hover:border-[#F59E0B]/50 transition-colors cursor-pointer"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-100 truncate">
                      {project.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-[#404040] text-gray-300 rounded">
                      {project.type.replace("_", " ")}
                    </span>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#404040]">
                  <div className="text-sm">
                    <span className="text-gray-500">Budget:</span>
                    <span className="ml-1 text-gray-300">
                      {formatCurrency(project.budget)}
                    </span>
                  </div>
                  {project.capacity && (
                    <div className="text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="ml-1 text-gray-300">
                        {project.capacity} MW
                      </span>
                    </div>
                  )}
                </div>

                {/* Manager */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-xs font-medium text-black">
                    {project.manager.name.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-400">
                    {project.manager.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Project Drawer */}
      <CreateProjectDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={fetchProjects}
      />
    </div>
  );
};

export default ProjectsPage;
