import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme.jsx";

const links = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/#skills" },
  { label: "Experience", to: "/#experience" },
  { label: "Projects", to: "/#projects" },
  { label: "Certifications", to: "/#certifications" },
  { label: "Resume", to: "/#resume" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (to) => {
    setOpen(false);

    if (!to.includes("#")) {
      navigate(to);
      return;
    }

    const hash = to.split("#")[1];
    if (location.pathname !== "/") {
      navigate(to);
      return;
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-mist/85 dark:bg-void/85 backdrop-blur-md border-b border-void/10 dark:border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-semibold text-lg tracking-tight"
        >
          rohit<span className="text-signal">.</span>dev
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.to)}
              className="px-3 py-2 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal dark:hover:text-signal transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="p-2 rounded-md text-slate-dim dark:text-slate hover:text-signal dark:hover:text-signal transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md text-slate-dim dark:text-slate"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-mist dark:bg-void border-b border-void/10 dark:border-white/10 px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.to)}
              className="text-left py-2 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
