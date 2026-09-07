import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  getProjectById,
  createProject,
  updateProject,
} from "../../services/projectService.js";

const emptyProject = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  stack: "",
  features: "",
  architecture: "",
  apiEndpoints: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
  challenges: "",
  learnings: "",
  futureImprovements: "",
};

// Backend stores these as real arrays; this form edits them as one item
// per line, converting at exactly two boundaries: load and save.
function arrayToLines(arr) {
  return (arr || []).join("\n");
}
function linesToArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ProjectEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyProject);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;
    getProjectById(id)
      .then((data) => {
        setForm({
          ...data,
          stack: arrayToLines(data.stack),
          features: arrayToLines(data.features),
          apiEndpoints: arrayToLines(data.apiEndpoints),
        });
      })
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    const payload = {
      ...form,
      stack: linesToArray(form.stack),
      features: linesToArray(form.features),
      apiEndpoints: linesToArray(form.apiEndpoints),
    };

    try {
      if (isEditMode) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/dashboard/projects");
    } catch (err) {
      const fieldErrors = err.response?.data?.fieldErrors;
      setError(
        fieldErrors
          ? Object.entries(fieldErrors)
              .map(([field, msg]) => `${field}: ${msg}`)
              .join(" · ")
          : "Something went wrong — check the fields and try again.",
      );
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <p className="font-mono text-sm text-slate-dim dark:text-slate">
        Loading…
      </p>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to projects
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Project" : "New Project"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Slug"
            value={form.slug}
            onChange={(v) => setField("slug", v)}
            hint="lowercase-with-hyphens"
          />
          <Field
            label="Title"
            value={form.title}
            onChange={(v) => setField("title", v)}
          />
        </div>

        <Field
          label="Short Description"
          value={form.shortDescription}
          onChange={(v) => setField("shortDescription", v)}
        />
        <Field
          label="Description"
          value={form.description}
          onChange={(v) => setField("description", v)}
          textarea
        />

        <Field
          label="Tech Stack"
          value={form.stack}
          onChange={(v) => setField("stack", v)}
          textarea
          hint="One technology per line"
          rows={4}
        />
        <Field
          label="Features"
          value={form.features}
          onChange={(v) => setField("features", v)}
          textarea
          hint="One per line"
          rows={4}
        />
        <Field
          label="Architecture"
          value={form.architecture}
          onChange={(v) => setField("architecture", v)}
        />
        <Field
          label="API Endpoints"
          value={form.apiEndpoints}
          onChange={(v) => setField("apiEndpoints", v)}
          textarea
          hint='One per line, e.g. "GET /api/products"'
          rows={4}
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="GitHub URL"
            value={form.githubUrl || ""}
            onChange={(v) => setField("githubUrl", v)}
          />
          <Field
            label="Live Demo URL"
            value={form.liveUrl || ""}
            onChange={(v) => setField("liveUrl", v)}
          />
        </div>
        <Field
          label="Image URL"
          value={form.imageUrl || ""}
          onChange={(v) => setField("imageUrl", v)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setField("featured", e.target.checked)}
            className="accent-signal"
          />
          <span className="text-sm text-void dark:text-ink">Featured</span>
        </label>

        <Field
          label="Challenges"
          value={form.challenges || ""}
          onChange={(v) => setField("challenges", v)}
          textarea
        />
        <Field
          label="What I Learned"
          value={form.learnings || ""}
          onChange={(v) => setField("learnings", v)}
          textarea
        />
        <Field
          label="Future Improvements"
          value={form.futureImprovements || ""}
          onChange={(v) => setField("futureImprovements", v)}
          textarea
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving
            ? "Saving…"
            : isEditMode
              ? "Save Changes"
              : "Create Project"}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, textarea, hint, rows = 3 }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink font-mono"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
        />
      )}
      {hint && (
        <span className="block text-[11px] text-slate-dim dark:text-slate mt-1">
          {hint}
        </span>
      )}
    </label>
  );
}
