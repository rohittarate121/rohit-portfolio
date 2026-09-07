import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons.jsx";
import { profile } from "../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="border-t border-void/10 dark:border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-dim dark:text-slate">
          © {new Date().getFullYear()} {profile.name} · built from scratch, not a template
        </p>
        <div className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-dim dark:text-slate hover:text-signal">
            <GithubIcon size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-dim dark:text-slate hover:text-signal">
            <LinkedinIcon size={16} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-slate-dim dark:text-slate hover:text-signal">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
