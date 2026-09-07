import { useAuth } from "../../hooks/useAuth.jsx";

export default function AdminOverview() {
  const { user } = useAuth();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
        GET /auth/me
      </p>
      <h1 className="font-display text-2xl font-semibold mb-2">
        Welcome back, {user?.username}.
      </h1>
      <p className="text-sm text-slate-dim dark:text-slate">
        Signed in as <span className="font-mono">{user?.role}</span>. Section
        management — Projects, Skills, Blog, and the rest — gets added here over
        the next few steps.
      </p>
    </div>
  );
}
