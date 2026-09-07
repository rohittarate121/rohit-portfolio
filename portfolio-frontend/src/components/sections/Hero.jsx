import { useEffect, useState } from "react";
import { Mail, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons.jsx";
import Button from "../ui/Button.jsx";
import { profile } from "../../data/portfolio.js";

const requests = [
  { method: "POST", path: "/api/auth/login", status: 200 },
  { method: "GET", path: "/api/projects", status: 200 },
  { method: "GET", path: "/api/skills", status: 200 },
  { method: "GET", path: "/api/blog", status: 200 },
  { method: "POST", path: "/api/contact", status: 201 },
];

function RequestPipeline() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActive((a) => (a + 1) % requests.length);
  }, [tick]);

  const req = requests[active];
  const methodColor =
    req.method === "GET"
      ? "text-signal"
      : req.method === "POST"
        ? "text-uptime"
        : "text-amber";

  const stages = ["Client", "REST API", "Service", "Database"];

  return (
    <div
      className="relative w-full rounded-xl border border-void/10 dark:border-white/10 bg-white dark:bg-void-surface p-6 font-mono text-sm shadow-[0_1px_0_rgba(0,0,0,0.02)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 mb-5">
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-uptime/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-3 text-xs text-slate-dim dark:text-slate">
          request-inspector
        </span>
      </div>

      <div className="mb-6 flex items-baseline gap-2">
        <span className={`font-semibold ${methodColor}`}>{req.method}</span>
        <span className="text-void dark:text-ink">{req.path}</span>
        <span className="ml-auto text-uptime text-xs">{req.status} OK</span>
      </div>

      <div className="flex items-center justify-between">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full bg-signal animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <span className="text-[11px] text-slate-dim dark:text-slate whitespace-nowrap">
                {stage}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className="flex-1 h-px bg-gradient-to-r from-signal/40 to-signal/10 mx-1 mb-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-uptime">
            <span className="h-2 w-2 rounded-full bg-uptime animate-pulse" />
            available for opportunities
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
            Hi, I&rsquo;m {profile.name.split(" ")[0]}.
            <br />
            <span className="text-signal">{profile.title}</span>
          </h1>

          <p className="text-lg text-slate-dim dark:text-slate max-w-xl mb-8 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              as="button"
              variant="primary"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </Button>
            <Button
              as="a"
              href={profile.resumeUrl}
              download
              variant="secondary"
            >
              Download Resume
            </Button>
            <Button
              as="button"
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-dim dark:text-slate hover:text-signal transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-slate-dim dark:text-slate hover:text-signal transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-slate-dim dark:text-slate hover:text-signal transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <RequestPipeline />
      </div>

      <button
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-dim dark:text-slate hover:text-signal transition-colors animate-bounce"
      >
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
