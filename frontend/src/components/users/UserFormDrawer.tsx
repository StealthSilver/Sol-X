import React, { useEffect, useMemo, useState } from "react";
import { Drawer } from "../ui/Drawer";
import { Input, Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { userApi } from "../../api/user.api";
import type { OrgUser } from "../../types/user";
import type { Role } from "../../types/auth";
import type { Project } from "../../types/project";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";

/** Drawer labels → stored Prisma/API roles */
const ROLE_OPTIONS_BASE: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "PROJECT_MANAGER", label: "Manager" },
  { value: "VIEWER", label: "Developer" },
  { value: "SITE_ENGINEER", label: "Site officer" },
];

const selectLikeClass = `
  w-full px-4 py-2.5 rounded-lg
  bg-zinc-50 dark:bg-[#0f0f0f] border border-zinc-200 dark:border-[#404040]
  text-zinc-800 dark:text-gray-100
  focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 focus-visible:border-[#F59E0B]
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-200
`;

interface UserFormDrawerProps {
  mode: "create" | "edit";
  user: OrgUser | null;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UserFormDrawer: React.FC<UserFormDrawerProps> = ({
  mode,
  user,
  projects,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user: currentUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("VIEWER");
  const [destination, setDestination] = useState("");
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const roleOptions = useMemo(() => {
    const opts: { value: Role; label: string }[] = [];
    const includeMaster =
      (mode === "create" && currentUser?.role === "MASTER_ADMIN") ||
      (mode === "edit" && user?.role === "MASTER_ADMIN");
    if (includeMaster) {
      opts.push({ value: "MASTER_ADMIN", label: "Master admin" });
    }
    opts.push(...ROLE_OPTIONS_BASE);
    return opts;
  }, [mode, user?.role, currentUser?.role]);

  useEffect(() => {
    if (!isOpen) return;
    setErrors({});
    if (mode === "edit" && user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
      setRole(user.role);
      setDestination(user.destination ?? "");
      setSelectedProjectIds(user.projects.map((p) => p.id));
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("VIEWER");
      setDestination("");
      setSelectedProjectIds([]);
    }
  }, [isOpen, mode, user]);

  const onProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = Array.from(e.target.selectedOptions, (o) => o.value);
    setSelectedProjectIds(next);
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    if (mode === "create") {
      if (!password) next.password = "Password is required";
      else if (password.length < 8)
        next.password = "Use at least 8 characters";
    } else if (password && password.length < 8) {
      next.password = "Use at least 8 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const projectIds = [...selectedProjectIds];
      const destTrim = destination.trim();

      if (mode === "create") {
        await userApi.createUser({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
          isActive: true,
          destination: destTrim || undefined,
          projectIds,
        });
        addNotification("success", "User added successfully");
      } else if (user) {
        const payload: {
          name: string;
          email: string;
          role: Role;
          projectIds: string[];
          destination: string | null;
          password?: string;
        } = {
          name: name.trim(),
          email: email.trim(),
          role,
          projectIds,
          destination: destTrim || null,
        };
        if (password.trim()) {
          payload.password = password;
        }
        await userApi.updateUser(user.id, payload);
        addNotification("success", "User updated successfully");
      }
      onSuccess();
      onClose();
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
          : "Something went wrong";
      addNotification("error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const multiSize = Math.min(
    10,
    Math.max(3, projects.length === 0 ? 3 : projects.length),
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Add user" : "Edit user"}
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5 pb-8">
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label={mode === "create" ? "Password" : "New password (optional)"}
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          helperText={
            mode === "edit"
              ? "Leave blank to keep the current password"
              : undefined
          }
        />

        <Select
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          options={roleOptions.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="projects-assigned"
            className="block text-sm font-medium text-zinc-600 dark:text-gray-300"
          >
            Projects assigned
          </label>
          <p className="text-xs text-zinc-900 dark:text-gray-500 -mt-0.5 mb-1">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple projects
          </p>
          <select
            id="projects-assigned"
            multiple
            size={multiSize}
            value={selectedProjectIds}
            onChange={onProjectsChange}
            className={selectLikeClass}
          >
            {projects.length === 0 ? (
              <option disabled value="">
                No projects in the system yet
              </option>
            ) : (
              projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-50 dark:bg-[#0f0f0f] py-1">
                  {p.name}
                </option>
              ))
            )}
          </select>
        </div>

        <Input
          label="Destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. region, office, or site"
          autoComplete="off"
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {mode === "create" ? "Add user" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
