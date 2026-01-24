import React from "react";
import { Card } from "../components/ui/Card";

/**
 * Placeholder page for Progress Updates (Site Engineers)
 * Phase 3 will implement full functionality
 */
const ProgressPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-50">Update Progress</h1>
        <p className="text-sm text-gray-400 mt-1">
          Submit progress updates and milestone photos
        </p>
      </div>

      <Card padding="lg">
        <div className="text-center py-12">
          <p className="text-gray-400">
            Progress update interface coming in Phase 3
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProgressPage;
