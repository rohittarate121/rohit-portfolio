import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GithubIcon } from "../components/ui/BrandIcons.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { getProjectBySlug } from "../services/projectService.js";
import { mapProjectFromApi } from "../utils/mapProject.js";

const methodColor = {
  GET: "text-signal",
  POST: "text-uptime",
  PUT: "text-amber",
  DELETE: "text-red-400",
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | notfound | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getProjectBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setProject(mapProjectFromApi(data));
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus(err.response?.status === 404 ? "notfound" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-slate-dim dark:text-slate">
          Loading project…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-mono text-signal mb-2">Error</p>
          <h1 className="font-display text-2xl font-semibold mb-4">
            Couldn&rsquo;t load this project.
          </h1>
          <Link to="/#projects" className="text-signal font-mono text-sm">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  if (status === "notfound" || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-mono text-signal mb-2">404</p>
          <h1 className="font-display text-2xl font-semibold mb-4">
            Project not found
          </h1>
          <Link to="/" className="text-signal font-mono text-sm">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-10"
        >
          <ArrowLeft size={15} /> Back to projects
        </Link>

        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
          {project.tagline}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          {project.name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-14">
          {project.github ? (
            <Button
              as="a"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              <GithubIcon size={16} /> GitHub Repository
            </Button>
          ) : (
            <span className="font-mono text-xs text-amber self-center">
              ⚠ repository link coming soon
            </span>
          )}
          {project.demo && (
            <Button
              as="a"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              <ExternalLink size={16} /> Live Demo
            </Button>
          )}
        </div>

        <Section title="Overview">
          <p>{project.description}</p>
        </Section>

        <Section title="Solution">
          <ul className="list-disc list-inside space-y-2">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Section>

        <Section title="Architecture">
          <Card className="p-6 font-mono text-sm text-slate-dim dark:text-slate">
            {project.architecture}
          </Card>
        </Section>

        <Section title="API Design">
          <Card className="p-5 font-mono text-sm divide-y divide-void/5 dark:divide-white/5">
            {project.endpoints.map((e) => (
              <div
                key={e.path}
                className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <span
                  className={`font-semibold w-14 ${methodColor[e.method] || "text-slate"}`}
                >
                  {e.method}
                </span>
                <span className="text-void dark:text-ink">{e.path}</span>
              </div>
            ))}
          </Card>
        </Section>

        <EditableSection title="Challenges" value={project.challenges} />
        <EditableSection title="What I Learned" value={project.learnings} />
        <EditableSection title="Future Improvements" value={project.future} />
      </div>
    </article>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-display font-semibold text-xl mb-4">{title}</h2>
      <div className="text-slate-dim dark:text-slate leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function EditableSection({ title, value }) {
  return (
    <Section title={title}>
      {value ? (
        <p>{value}</p>
      ) : (
        <p className="text-amber italic text-sm">
          Not documented yet — add this from the admin dashboard once it's live.
        </p>
      )}
    </Section>
  );
}
