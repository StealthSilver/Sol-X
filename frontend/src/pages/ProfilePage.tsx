import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Building2,
  Edit2,
  X,
  Save,
  Bell,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { usePreferencesStore } from "../store/preferencesStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Switch } from "../components/ui/Switch";
import { authApi } from "../api/auth.api";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const {
    emailNotifications,
    pushNotifications,
    smsNotifications,
    theme,
    setEmailNotifications,
    setPushNotifications,
    setSmsNotifications,
    setTheme,
  } = usePreferencesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");

  if (!user) return null;

  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "MASTER_ADMIN":
        return "border-[#F59E0B] bg-[#F59E0B]/10 text-[#D97706] dark:text-[#F59E0B]";
      case "ADMIN":
        return "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "PROJECT_MANAGER":
        return "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
      case "SITE_ENGINEER":
        return "border-orange-500 bg-orange-500/10 text-orange-700 dark:text-orange-400";
      case "VIEWER":
        return "border-zinc-400 bg-zinc-500/10 text-zinc-700 dark:border-gray-500 dark:text-gray-400";
      default:
        return "border-[#F59E0B] bg-[#F59E0B]/10 text-[#D97706] dark:text-[#F59E0B]";
    }
  };

  const handleEdit = () => {
    setEditedName(user.name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      addNotification("error", "Name cannot be empty");
      return;
    }

    if (editedName.trim().length < 2) {
      addNotification("error", "Name must be at least 2 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.updateProfile({ name: editedName.trim() });
      updateUser(response.user);
      addNotification("success", "Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to update profile";
      addNotification("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const profileFields = [
    {
      label: "Full Name",
      value: user.name,
      icon: User,
      editable: true,
    },
    {
      label: "Email Address",
      value: user.email,
      icon: Mail,
      editable: false,
    },
    {
      label: "Role",
      value: formatRole(user.role),
      icon: Shield,
      isBadge: true,
      editable: false,
    },
    {
      label: "User ID",
      value: user.id,
      icon: Building2,
      editable: false,
    },
  ];

  const fieldShell = (active: boolean) =>
    `group flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 ${
      active
        ? "border-[#F59E0B]/30 bg-[#F59E0B]/5 dark:bg-[#F59E0B]/5"
        : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100/80 dark:border-[#404040]/50 dark:bg-[#0f0f0f] dark:hover:border-[#404040] dark:hover:bg-[#0f0f0f]/80"
    }`;

  const iconWrap = (active: boolean) =>
    `flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
      active
        ? "bg-[#F59E0B]/20"
        : "bg-zinc-200 group-hover:bg-zinc-300 dark:bg-[#252525] dark:group-hover:bg-[#303030]"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-gray-50">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-gray-400">
            View and manage your account information
          </p>
        </div>
        {!isEditing ? (
          <Button variant="secondary" size="md" onClick={handleEdit}>
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              isLoading={isLoading}
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card padding="lg">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-lg shadow-[#F59E0B]/10">
            <User size={36} className="text-white" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full max-w-xs rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-xl font-semibold text-zinc-900 transition-all duration-200 placeholder:text-zinc-400 focus-visible:border-[#F59E0B] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 dark:border-[#404040] dark:bg-[#0f0f0f] dark:text-gray-50 dark:placeholder:text-gray-500"
                placeholder="Enter your name"
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-gray-50">
                {user.name}
              </h2>
            )}
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium ${getRoleBadgeColor(user.role)}`}
            >
              <Shield size={12} />
              {formatRole(user.role)}
            </span>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-gray-400">
          Account Information
        </h3>
        <div className="space-y-3">
          {profileFields.map((field) => (
            <div
              key={field.label}
              className={fieldShell(!!field.editable && isEditing)}
            >
              <div className={iconWrap(!!field.editable && isEditing)}>
                <field.icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    field.editable && isEditing
                      ? "text-[#F59E0B]"
                      : "text-zinc-600 group-hover:text-zinc-800 dark:text-gray-400 dark:group-hover:text-gray-300"
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-gray-500">
                  {field.label}
                </p>
                {field.label === "Full Name" && isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 transition-all duration-200 placeholder:text-zinc-400 focus-visible:border-[#F59E0B] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 dark:border-[#404040]/50 dark:bg-[#1a1a1a] dark:text-gray-50 dark:placeholder:text-gray-500"
                    placeholder="Enter your name"
                  />
                ) : field.isBadge ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${getRoleBadgeColor(user.role)}`}
                  >
                    {field.value}
                  </span>
                ) : (
                  <p className="truncate text-sm font-medium text-zinc-800 dark:text-gray-100">
                    {field.value}
                  </p>
                )}
              </div>
              {!field.editable && field.label !== "Role" && (
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-gray-600">
                  Read only
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-gray-400">
          Notifications
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-[#404040]/50 dark:bg-[#0f0f0f]">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-200 dark:bg-[#252525]">
                <Mail size={18} className="text-zinc-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-gray-100">
                  Email notifications
                </p>
                <p className="text-xs text-zinc-500 dark:text-gray-500">
                  Project updates and reports by email
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onChange={setEmailNotifications}
              aria-label="Email notifications"
            />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-[#404040]/50 dark:bg-[#0f0f0f]">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-200 dark:bg-[#252525]">
                <Bell size={18} className="text-zinc-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-gray-100">
                  Push notifications
                </p>
                <p className="text-xs text-zinc-500 dark:text-gray-500">
                  Alerts in the browser and on your devices
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onChange={setPushNotifications}
              aria-label="Push notifications"
            />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-[#404040]/50 dark:bg-[#0f0f0f]">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-200 dark:bg-[#252525]">
                <Smartphone
                  size={18}
                  className="text-zinc-600 dark:text-gray-400"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-gray-100">
                  SMS notifications
                </p>
                <p className="text-xs text-zinc-500 dark:text-gray-500">
                  Critical alerts via text message
                </p>
              </div>
            </div>
            <Switch
              checked={smsNotifications}
              onChange={setSmsNotifications}
              aria-label="SMS notifications"
            />
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-gray-400">
          Appearance
        </h3>
        <p className="mb-4 text-xs text-zinc-500 dark:text-gray-500">
          Choose light or dark theme for the app. Dark is the default.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
              theme === "light"
                ? "border-[#F59E0B] bg-[#F59E0B]/10 text-zinc-900 dark:text-gray-50"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-[#404040] dark:bg-[#0f0f0f] dark:text-gray-300 dark:hover:border-[#525252]"
            }`}
          >
            <Sun size={18} className="text-[#F59E0B]" />
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "border-[#F59E0B] bg-[#F59E0B]/10 text-zinc-900 dark:text-gray-50"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-[#404040] dark:bg-[#0f0f0f] dark:text-gray-300 dark:hover:border-[#525252]"
            }`}
          >
            <Moon size={18} className="text-[#F59E0B]" />
            Dark
          </button>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-gray-400">
          Account Status
        </h3>
        <div className="group flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-all duration-200 hover:border-zinc-300 dark:border-[#404040]/50 dark:bg-[#0f0f0f] dark:hover:border-[#404040]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 dark:bg-green-400 dark:shadow-green-400/50" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-gray-500">
              Status
            </p>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Active
            </p>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <div className="flex items-start gap-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/5">
            <Shield size={16} className="text-[#F59E0B]/70" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-800 dark:text-gray-300">
              Security Notice
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-gray-500">
              Your account is protected. Contact your administrator if you need
              to update your email or role permissions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
