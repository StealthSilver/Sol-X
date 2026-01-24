import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../api/auth.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "request">("signin");

  // Request Access form state
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      setUser(response.user, response.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestMessage("");
    setRequestLoading(true);

    try {
      await authApi.requestAccess(requestForm);
      setRequestMessage("Request sent! We'll get back to you shortly.");
      setRequestForm({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to submit request. Please try again.";
      setRequestMessage(errorMessage);
    } finally {
      setRequestLoading(false);
    }
  };

  const inputStyles = {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "var(--charcoal-900)",
    border: "1px solid var(--charcoal-500)",
    borderRadius: "8px",
    color: "var(--foreground)",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    outline: "none",
    transition: "all 0.2s ease",
  };

  const inputFocusStyles = {
    borderColor: "#F59E0B",
    boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.1)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--charcoal-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse-glow 5s ease-in-out infinite 1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(100px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      {/* Login Card */}
      <div
        className="card-elevated"
        style={{
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          zIndex: 10,
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", padding: "32px 48px 24px" }}>
          <img
            src="/solx-logo.svg"
            alt="Sol-X"
            style={{
              height: "48px",
              width: "auto",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--charcoal-500)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab("signin");
              setError("");
              setRequestMessage("");
            }}
            style={{
              flex: 1,
              padding: "16px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "15px",
              color: activeTab === "signin" ? "#F59E0B" : "#9CA3AF",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.2s ease",
            }}
          >
            Sign In
            {activeTab === "signin" && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(to right, #F59E0B, #EA580C)",
                }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("request");
              setError("");
              setRequestMessage("");
            }}
            style={{
              flex: 1,
              padding: "16px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "15px",
              color: activeTab === "request" ? "#F59E0B" : "#9CA3AF",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.2s ease",
            }}
          >
            Request Access
            {activeTab === "request" && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(to right, #F59E0B, #EA580C)",
                }}
              />
            )}
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "48px", position: "relative" }}>
          <div
            key={activeTab}
            style={{
              animation: "fadeIn 0.4s ease-out forwards",
            }}
          >
            {activeTab === "signin" ? (
              <>
                <h1
                  style={{
                    color: "var(--foreground)",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Welcome Back
                </h1>
                <p
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    marginBottom: "32px",
                    fontSize: "15px",
                  }}
                >
                  Sign in to continue to Sol-X
                </p>

                {error && (
                  <div
                    style={{
                      backgroundColor: "rgba(127, 29, 29, 0.3)",
                      color: "#FCA5A5",
                      padding: "14px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      fontSize: "14px",
                      border: "1px solid rgba(220, 38, 38, 0.3)",
                    }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter your password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "linear-gradient(to right, #F59E0B, #EA580C)",
                      color: "#0F0F0F",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading ? 0.7 : 1,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(245, 158, 11, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1
                  style={{
                    color: "var(--foreground)",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Request Access
                </h1>
                <p
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    marginBottom: "32px",
                    fontSize: "15px",
                  }}
                >
                  Fill out the form and we'll get back to you
                </p>

                {requestMessage && (
                  <div
                    style={{
                      backgroundColor: requestMessage.includes("sent")
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(127, 29, 29, 0.3)",
                      color: requestMessage.includes("sent")
                        ? "#10B981"
                        : "#FCA5A5",
                      padding: "14px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      fontSize: "14px",
                      border: requestMessage.includes("sent")
                        ? "1px solid rgba(16, 185, 129, 0.3)"
                        : "1px solid rgba(220, 38, 38, 0.3)",
                    }}
                  >
                    {requestMessage}
                  </div>
                )}

                <form onSubmit={handleRequestSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={requestForm.name}
                      onChange={(e) =>
                        setRequestForm({ ...requestForm, name: e.target.value })
                      }
                      required
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={requestForm.email}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          email: e.target.value,
                        })
                      }
                      required
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="you@company.com"
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      value={requestForm.company}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          company: e.target.value,
                        })
                      }
                      required
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        marginBottom: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={requestForm.message}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          message: e.target.value,
                        })
                      }
                      required
                      rows={4}
                      style={{
                        ...inputStyles,
                        resize: "none" as const,
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--charcoal-500)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Tell us why you need access..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={requestLoading}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "linear-gradient(to right, #F59E0B, #EA580C)",
                      color: "#0F0F0F",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: requestLoading ? "not-allowed" : "pointer",
                      opacity: requestLoading ? 0.7 : 1,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!requestLoading) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(245, 158, 11, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {requestLoading ? "Sending..." : "Send Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
