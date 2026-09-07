import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import apiClient from "../../services/apiClient.js";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    try {
      const { data } = await apiClient.post("/auth/login", {
        username,
        password,
      });
      login(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid username or password."
          : "Something went wrong — try again.",
      );
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-mist dark:bg-void">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Lock size={18} className="text-signal" />
          <span className="font-mono text-sm text-slate-dim dark:text-slate">
            POST /api/auth/login
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-void/10 dark:border-white/10 bg-white dark:bg-void-surface p-8"
        >
          <h1 className="font-display text-xl font-semibold text-center mb-2 text-void dark:text-ink">
            Admin Login
          </h1>

          <label className="block">
            <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
            />
          </label>

          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
