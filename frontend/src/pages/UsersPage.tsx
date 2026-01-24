import React from "react";
import { Card } from "../components/ui/Card";

/**
 * Placeholder page for Users Management
 * Phase 3 will implement full functionality
 */
const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-50">Users</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage user accounts and permissions
        </p>
      </div>

      <Card padding="lg">
        <div className="text-center py-12">
          <p className="text-gray-400">
            User management interface coming in Phase 3
          </p>
        </div>
      </Card>
    </div>
  );
};

export default UsersPage;
