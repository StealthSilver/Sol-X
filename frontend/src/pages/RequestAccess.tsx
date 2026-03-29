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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f2ed] px-4 dark:bg-[#0f0f0f]">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-[#e7e2dc] bg-white p-8 text-center shadow-lg dark:border-transparent dark:bg-[#1a1a1a]">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <svg
                  className="h-8 w-8 text-emerald-600 dark:text-[#10B981]"
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

            <h2 className="mb-3 text-2xl font-semibold text-stone-900 dark:text-gray-50">
              Request Submitted
            </h2>
            <p className="mb-6 text-stone-600 dark:text-gray-400">
              Your access request has been submitted successfully. Our team will
              review your request and get back to you soon.
            </p>

            <Link
              to="/login"
              className="inline-block w-full rounded-md bg-[#F59E0B] py-3 font-medium text-[#0f0f0f] transition-all duration-200 hover:bg-[#D97706]"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 transition-all duration-200 focus-visible:border-[#F59E0B] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-0 dark:border-gray-700 dark:bg-[#0f0f0f] dark:text-gray-100 dark:placeholder-gray-500";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f2ed] px-4 py-8 dark:bg-[#0f0f0f]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-stone-900 dark:text-gray-50">
            Sol-X
          </h1>
          <p className="text-sm text-stone-600 dark:text-gray-400">
            Request access to the platform
          </p>
        </div>

        <div className="rounded-lg border border-[#e7e2dc] bg-white p-8 shadow-lg dark:border-transparent dark:bg-[#1a1a1a]">
          <h2 className="mb-6 text-xl font-semibold text-stone-900 dark:text-gray-50">
            Request Access
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={fieldClass}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={fieldClass}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300"
              >
                Company Name
              </label>
              <input
                {...register("company")}
                type="text"
                id="company"
                className={fieldClass}
                placeholder="Your Company"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className={`${fieldClass} resize-none`}
                placeholder="Tell us why you need access and what role you're interested in..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#F59E0B] py-3 font-medium text-[#0f0f0f] transition-all duration-200 hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-50"
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
            <p className="text-sm text-stone-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#F59E0B] transition-colors duration-200 hover:text-[#D97706]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-stone-500 dark:text-gray-500">
          Your request will be reviewed by our team
        </p>
      </div>
    </div>
  );
};

export default RequestAccess;
