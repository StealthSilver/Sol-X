import React, { useState } from "react";
import { User, Mail, Shield, Building2, Edit2, X, Save } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { authApi } from "../api/auth.api";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");

  if (!user) return null;

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "MASTER_ADMIN":
        return "border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]";
      case "ADMIN":
        return "border-blue-500 bg-blue-500/10 text-blue-400";
      case "PROJECT_MANAGER":
        return "border-green-500 bg-green-500/10 text-green-400";
      case "SITE_ENGINEER":
        return "border-orange-500 bg-orange-500/10 text-orange-400";
      case "VIEWER":
        return "border-gray-500 bg-gray-500/10 text-gray-400";
      default:
        return "border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]";
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-50">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-400 mt-1">
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

      {/* Profile Header Card */}
      <Card padding="lg">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <User size={36} className="text-white" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-xl font-semibold text-gray-50 bg-[#0f0f0f] border border-[#404040] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="Enter your name"
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-50">
                {user.name}
              </h2>
            )}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 mt-2 text-xs font-medium rounded-lg border ${getRoleBadgeColor(user.role)}`}
            >
              <Shield size={12} />
              {formatRole(user.role)}
            </span>
          </div>
        </div>
      </Card>

      {/* Account Information */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
          Account Information
        </h3>
        <div className="space-y-4">
          {profileFields.map((field) => (
            <div
              key={field.label}
              className="flex items-center gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#404040]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#404040] flex items-center justify-center">
                <field.icon size={20} className="text-[#F59E0B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {field.label}
                </p>
                {field.label === "Full Name" && isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full text-sm font-medium text-gray-50 bg-transparent border-b border-[#404040] focus:border-[#F59E0B] outline-none py-1 mt-0.5 transition-colors"
                    placeholder="Enter your name"
                  />
                ) : field.isBadge ? (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 text-sm font-medium rounded border ${getRoleBadgeColor(user.role)}`}
                  >
                    {field.value}
                  </span>
                ) : (
                  <p className="text-sm font-medium text-gray-50 truncate mt-0.5">
                    {field.value}
                  </p>
                )}
              </div>
              {!field.editable && field.label !== "Role" && (
                <span className="text-xs text-gray-500">Read only</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Account Status */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
          Account Status
        </h3>
        <div className="flex items-center gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#404040]">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Status
            </p>
            <p className="text-sm font-medium text-green-400 mt-0.5">Active</p>
          </div>
        </div>
      </Card>

      {/* Security Notice */}
      <Card padding="md">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-200">Security Notice</p>
            <p className="text-xs text-gray-400 mt-1">
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
