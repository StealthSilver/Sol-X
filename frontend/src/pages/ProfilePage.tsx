import React from "react";
import { User, Mail, Shield, Building2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Card } from "../components/ui/Card";

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

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

  const profileFields = [
    {
      label: "Full Name",
      value: user.name,
      icon: User,
    },
    {
      label: "Email Address",
      value: user.email,
      icon: Mail,
    },
    {
      label: "Role",
      value: formatRole(user.role),
      icon: Shield,
      isBadge: true,
    },
    {
      label: "User ID",
      value: user.id,
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-50">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          View and manage your account information
        </p>
      </div>

      {/* Profile Header Card */}
      <Card padding="lg">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <User size={36} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-50">{user.name}</h2>
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
                {field.isBadge ? (
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
