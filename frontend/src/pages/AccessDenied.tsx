import React from "react";
import { Link } from "react-router-dom";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f2ed] px-4 dark:bg-[#0f0f0f]">
      <div className="w-full max-w-md text-center">
        <div className="rounded-lg border border-[#e7e2dc] bg-white p-8 shadow-lg dark:border-transparent dark:bg-[#1a1a1a]">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <svg
                className="h-8 w-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-semibold text-stone-900 dark:text-gray-50">
            Access Denied
          </h2>
          <p className="mb-6 text-stone-600 dark:text-gray-400">
            You don&apos;t have permission to access this resource. Please
            contact your administrator if you believe this is an error.
          </p>

          <Link
            to="/dashboard"
            className="inline-block w-full rounded-md bg-[#F59E0B] py-3 font-medium text-[#0f0f0f] transition-all duration-200 hover:bg-[#D97706]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
