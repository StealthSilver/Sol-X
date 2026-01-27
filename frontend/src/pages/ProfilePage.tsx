import React from "react";
import { User, Mail, Shield, Building2, Calendar, Edit2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "MASTER_ADMIN":
        return "from-purple-500 to-purple-700";
      case "ADMIN":
        return "from-blue-500 to-blue-700";
      case "PROJECT_MANAGER":
        return "from-green-500 to-green-700";
      case "SITE_ENGINEER":
        return "from-orange-500 to-orange-700";
      case "VIEWER":
        return "from-gray-500 to-gray-700";
      default:
        return "from-[#F59E0B] to-[#D97706]";
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "MASTER_ADMIN":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "ADMIN":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "PROJECT_MANAGER":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "SITE_ENGINEER":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "VIEWER":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30";
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
    <div className="min-h-full p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-50">Profile Settings</h1>
          <p className="text-gray-400 mt-1">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl overflow-hidden">
          {/* Profile Header with Avatar */}
          <div className="relative h-32 bg-gradient-to-r from-[#F59E0B]/20 to-[#D97706]/20">
            <div className="absolute -bottom-12 left-6">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center border-4 border-[#1a1a1a] shadow-lg`}
              >
                <User size={40} className="text-white" />
              </div>
            </div>
          </div>

          {/* User Name and Role Badge */}
          <div className="pt-16 px-6 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-50">
                  {user.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 mt-2 text-xs font-medium rounded-full border ${getRoleBadgeColor(user.role)}`}
                >
                  <Shield size={12} />
                  {formatRole(user.role)}
                </span>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 bg-[#404040] hover:bg-[#505050] rounded-lg transition-colors"
                disabled
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#404040]" />

          {/* Profile Information */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              {profileFields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg border border-[#404040]/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#404040] flex items-center justify-center">
                    <field.icon size={20} className="text-[#F59E0B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#404040]" />

          {/* Account Status Section */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Account Status
            </h3>
            <div className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg border border-[#404040]/50">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Calendar size={20} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Account Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-sm font-medium text-green-400">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-6 p-4 bg-[#1a1a1a] border border-[#404040] rounded-lg"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">
                Security Notice
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your account is protected. Contact your administrator if you
                need to update your email or role permissions.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
