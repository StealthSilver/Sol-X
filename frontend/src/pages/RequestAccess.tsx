import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "../api/auth.api";

// Validation schema
const requestAccessSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type RequestAccessFormData = z.infer<typeof requestAccessSchema>;

const RequestAccess: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestAccessFormData>({
    resolver: zodResolver(requestAccessSchema),
  });

  const onSubmit = async (data: RequestAccessFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.requestAccess(data);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        "Failed to submit request. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#10B981]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-50 mb-3">
              Request Submitted
            </h2>
            <p className="text-gray-400 mb-6">
              Your access request has been submitted successfully. Our team will
              review your request and get back to you soon.
            </p>

            <Link
              to="/login"
              className="inline-block w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium py-3 rounded-md transition-all duration-200"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-50 mb-2">Sol-X</h1>
          <p className="text-gray-400 text-sm">
            Request access to the platform
          </p>
        </div>

        {/* Request Access Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-50 mb-6">
            Request Access
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all duration-200"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Company Name
              </label>
              <input
                {...register("company")}
                type="text"
                id="company"
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all duration-200"
                placeholder="Your Company"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us why you need access and what role you're interested in..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium py-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#F59E0B] hover:text-[#D97706] font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-gray-500">
          Your request will be reviewed by our team
        </p>
      </div>
    </div>
  );
};

export default RequestAccess;
