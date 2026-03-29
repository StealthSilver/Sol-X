import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search, Users as UsersIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { UserFormDrawer } from "../components/users/UserFormDrawer";
import { userApi } from "../api/user.api";
import { projectApi } from "../api/project.api";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import type { OrgUser } from "../types/user";
import type { Role } from "../types/auth";
import type { Project } from "../types/project";

function orgRoleLabel(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "PROJECT_MANAGER":
      return "Manager";
    case "VIEWER":
      return "Developer";
    case "SITE_ENGINEER":
      return "Site officer";
    case "MASTER_ADMIN":
      return "Master admin";
    default:
      return role;
  }
}

const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [users, setUsers] = useState<OrgUser[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = useState<OrgUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OrgUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [usersRes, projectsRes] = await Promise.all([
        userApi.getUsers(),
        projectApi.getProjects({ page: 1, limit: 500 }),
      ]);
      setUsers(usersRes.users);
      setProjects(projectsRes.projects);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        orgRoleLabel(u.role).toLowerCase().includes(q) ||
        (u.destination?.toLowerCase().includes(q) ?? false) ||
        u.projects.some((p) => p.name.toLowerCase().includes(q)),
    );
  }, [users, searchQuery]);

  const openCreate = () => {
    setDrawerMode("create");
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const openEdit = (u: OrgUser) => {
    setDrawerMode("edit");
    setEditingUser(u);
    setDrawerOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await userApi.deleteUser(deleteTarget.id);
      addNotification("success", "User removed");
      setDeleteTarget(null);
      await loadData();
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
          ? String((err.response.data as { error?: string }).error)
          : "Could not delete user";
      addNotification("error", msg);
    } finally {
      setDeleteLoading(false);
    }
  };

  const projectsLabel = (u: OrgUser) => {
    if (u.projects.length === 0) return "—";
    return u.projects.map((p) => p.name).join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-gray-50">Users</h1>
          <p className="text-sm text-zinc-500 dark:text-gray-400 mt-1">
            Members of your organization — roles, access, and project
            assignments
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add user
        </Button>
      </div>

      <Card padding="md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, role, destination, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#e7e2dc] bg-white py-2.5 pl-10 pr-4 text-zinc-800 placeholder-zinc-400 focus-visible:border-[#F59E0B] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 dark:border-[#404040] dark:bg-[#0f0f0f] dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>
      </Card>

      {isLoading ? (
        <Card padding="lg">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-full rounded bg-stone-200 dark:bg-gray-700" />
            <div className="h-10 w-full rounded bg-stone-200 dark:bg-gray-700" />
            <div className="h-10 w-full rounded bg-stone-200 dark:bg-gray-700" />
          </div>
        </Card>
      ) : filteredUsers.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 dark:bg-[#404040]">
              <UsersIcon className="h-8 w-8 text-stone-500 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-zinc-700 dark:text-gray-200 mb-2">
              {searchQuery ? "No users match your search" : "No users yet"}
            </h3>
            <p className="text-zinc-500 dark:text-gray-400 mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Add team members to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={openCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Add user
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e7e2dc] bg-stone-100/90 dark:border-[#404040] dark:bg-[#141414]">
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400">Name</th>
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400">Role</th>
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400 min-w-[180px]">
                    Projects assigned
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400 min-w-[120px]">
                    Destination
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 dark:text-gray-400 text-right w-[140px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[#2a2a2a] hover:bg-[#1f1f1f]/80 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-800 dark:text-gray-100">
                          {u.name}
                        </span>
                        {!u.isActive && (
                          <span className="rounded bg-stone-200 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-stone-600 dark:bg-gray-700 dark:text-gray-300">
                            Inactive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-gray-300">
                      {orgRoleLabel(u.role)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-gray-400 max-w-xs">
                      <span className="line-clamp-2" title={projectsLabel(u)}>
                        {projectsLabel(u)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-gray-400 max-w-[160px]">
                      <span className="line-clamp-2" title={u.destination ?? ""}>
                        {u.destination?.trim() ? u.destination : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(u)}
                          className="p-2 rounded-lg text-zinc-500 dark:text-gray-400 hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors"
                          aria-label={`Edit ${u.name}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(u)}
                          disabled={u.id === currentUser?.id}
                          className="p-2 rounded-lg text-zinc-500 dark:text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                          aria-label={`Delete ${u.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <UserFormDrawer
        mode={drawerMode}
        user={editingUser}
        projects={projects}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingUser(null);
        }}
        onSuccess={loadData}
      />

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm dark:bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-user-title"
        >
          <Card padding="lg" className="max-w-md w-full border-zinc-200 dark:border-[#404040]">
            <h2
              id="delete-user-title"
              className="text-lg font-semibold text-zinc-900 dark:text-gray-50 mb-2"
            >
              Delete user
            </h2>
            <p className="text-sm text-zinc-500 dark:text-gray-400 mb-6">
              Remove <span className="text-zinc-700 dark:text-gray-200">{deleteTarget.name}</span>{" "}
              ({deleteTarget.email})? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                isLoading={deleteLoading}
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
