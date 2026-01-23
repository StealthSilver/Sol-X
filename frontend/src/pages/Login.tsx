import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { type login } from "../api/auth.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      setAuth(response.user, response.token);
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
        backgroundColor: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            color: "#FAFAFA",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Welcome to Sol-X
        </h1>
        <p
          style={{
            color: "#94A3B8",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Sign in to your account
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#7F1D1D",
              color: "#FCA5A5",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#FAFAFA",
                marginBottom: "8px",
                fontSize: "14px",
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
                padding: "12px",
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#FAFAFA",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "#FAFAFA",
                marginBottom: "8px",
                fontSize: "14px",
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
                padding: "12px",
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#FAFAFA",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F59E0B",
              color: "#0F172A",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p
          style={{
            color: "#94A3B8",
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
          }}
        >
          Don't have access?{" "}
          <Link
            to="/request-access"
            style={{ color: "#F59E0B", textDecoration: "none" }}
          >
            Request Access
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
