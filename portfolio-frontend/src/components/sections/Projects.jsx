import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";
import { getAllProjects } from "../../services/projectService.js";
import { mapProjectFromApi } from "../../utils/mapProject.js";

function ProjectCardSkeleton() {
  return (
    <Card className="p-6 sm:p-7 animate-pulse">
      <div className="h-6 w-2/3 bg-void/10 dark:bg-white/10 rounded mb-3" />
      <div className="h-4 w-1/2 bg-void/10 dark:bg-white/10 rounded mb-4" />
      <div className="h-4 w-full bg-void/5 dark:bg-white/5 rounded mb-2" />
      <div className="h-4 w-5/6 bg-void/5 dark:bg-white/5 rounded mb-6" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-void/10 dark:bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-void/10 dark:bg-white/10 rounded-full" />
      </div>
    </Card>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    getAllProjects()
      .then((data) => {
        if (cancelled) return;
        setProjects(data.map(mapProjectFromApi));
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="projects"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>GET /projects</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Projects
        </h2>
        <p className="text-slate-dim dark:text-slate mb-12 max-w-xl">
          Selected work — full case studies behind each card.
        </p>

        {status === "loading" && (
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        )}

        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load projects right now — the API may be offline. Try
            refreshing.
          </Card>
        )}

        {status === "success" && projects.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            No projects published yet.
          </Card>
        )}

        {status === "success" && projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Card
                key={p.slug}
                className="p-6 sm:p-7 flex flex-col hover:border-signal/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display font-semibold text-xl">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} GitHub repository`}
                        className="text-slate-dim dark:text-slate hover:text-signal"
                      >
                        <GithubIcon size={18} />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} live demo`}
                        className="text-slate-dim dark:text-slate hover:text-signal"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-signal text-sm font-mono mb-3">
                  {p.tagline}
                </p>
                <p className="text-sm text-slate-dim dark:text-slate leading-relaxed mb-5">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                  {p.stack.length > 5 && <Badge>+{p.stack.length - 5}</Badge>}
                </div>

                <Link
                  to={`/projects/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-mono text-signal hover:gap-2.5 transition-all"
                >
                  View Details <ArrowUpRight size={15} />
                </Link>

                {p.isPlaceholderLinks && (
                  <p className="mt-3 text-[11px] font-mono text-amber">
                    ⚠ repository link coming soon
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
