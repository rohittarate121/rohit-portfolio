import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";

const navItems = [
  { label: "Overview", to: "/admin/dashboard", end: true },
  { label: "Projects", to: "/admin/dashboard/projects" },
  { label: "Skills", to: "/admin/dashboard/skills" },
  { label: "Experience", to: "/admin/dashboard/experience" },
  { label: "Education", to: "/admin/dashboard/education" },
  { label: "Certifications", to: "/admin/dashboard/certifications" },
  { label: "Blog", to: "/admin/dashboard/blog" },
  { label: "Messages", to: "/admin/dashboard/messages" },
  { label: "Resume", to: "/admin/dashboard/resume" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-mist dark:bg-void text-void dark:text-ink">
      <aside className="w-56 shrink-0 border-r border-void/10 dark:border-white/10 bg-white dark:bg-void-surface p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard size={18} className="text-signal" />
          <span className="font-display font-semibold text-sm">Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                  isActive
                    ? "bg-signal/10 text-signal"
                    : "text-slate-dim dark:text-slate hover:text-signal"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-void/10 dark:border-white/10">
          <p className="text-xs font-mono text-slate-dim dark:text-slate mb-3 truncate">
            {user?.username}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-mono text-slate-dim dark:text-slate hover:text-red-400 transition-colors"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
