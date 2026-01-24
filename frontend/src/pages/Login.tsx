import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../api/auth.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          padding: "48px",
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          zIndex: 10,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "var(--charcoal-900)",
                border: "1px solid var(--charcoal-500)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#F59E0B";
                e.target.style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.1)";
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
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "var(--charcoal-900)",
                border: "1px solid var(--charcoal-500)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#F59E0B";
                e.target.style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.1)";
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

        <p
          style={{
            color: "#9CA3AF",
            textAlign: "center",
            marginTop: "28px",
            fontSize: "14px",
          }}
        >
          Don't have access?{" "}
          <Link
            to="/request-access"
            style={{
              color: "#F59E0B",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#EA580C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#F59E0B";
            }}
          >
            Request Access
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
