import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import MarkdownRenderer from "../../components/ui/MarkdownRenderer.jsx";
import {
  getAllPostsForAdmin,
  createPost,
  updatePost,
} from "../../services/blogService.js";

const STATUSES = ["DRAFT", "PUBLISHED"];
const emptyPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  status: "DRAFT",
};

function arrayToLines(arr) {
  return (arr || []).join("\n");
}
function linesToArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function BlogEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyPost);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("edit"); // edit | preview

  useEffect(() => {
    if (!isEditMode) return;
    // GET /slug/{slug} is published-only (Step 18) — would 404 exactly
    // the drafts most likely to need editing. /all already sees
    // everything, so it's reused here rather than adding a new endpoint.
    getAllPostsForAdmin()
      .then((posts) => {
        const match = posts.find((p) => p.id === Number(id));
        if (match) {
          setForm({ ...match, tags: arrayToLines(match.tags) });
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    const payload = { ...form, tags: linesToArray(form.tags) };

    try {
      if (isEditMode) {
        await updatePost(id, payload);
      } else {
        await createPost(payload);
      }
      navigate("/admin/dashboard/blog");
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
    <div className="max-w-3xl">
      <Link
        to="/admin/dashboard/blog"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to blog
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Post" : "New Post"}
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
          label="Excerpt"
          value={form.excerpt}
          onChange={(v) => setField("excerpt", v)}
          textarea
          rows={2}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="block text-xs font-mono text-slate-dim dark:text-slate">
              Content (Markdown)
            </span>
            <div className="flex gap-1">
              <TabButton
                active={view === "edit"}
                onClick={() => setView("edit")}
              >
                Edit
              </TabButton>
              <TabButton
                active={view === "preview"}
                onClick={() => setView("preview")}
              >
                Preview
              </TabButton>
            </div>
          </div>

          {view === "edit" ? (
            <textarea
              rows={16}
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink font-mono"
            />
          ) : (
            <div className="rounded-md border border-void/15 dark:border-white/15 px-5 py-4 max-h-[28rem] overflow-y-auto">
              {form.content.trim() ? (
                <MarkdownRenderer content={form.content} />
              ) : (
                <p className="text-sm text-slate-dim dark:text-slate italic">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Category"
            value={form.category}
            onChange={(v) => setField("category", v)}
            hint="Must match an existing category to group correctly"
          />
          <label className="block">
            <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
              Status
            </span>
            <select
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              className="w-full rounded-md border border-void/15 dark:border-white/15 bg-mist dark:bg-void px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Field
          label="Tags"
          value={form.tags}
          onChange={(v) => setField("tags", v)}
          textarea
          rows={3}
          hint="One per line"
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? "Saving…" : isEditMode ? "Save Changes" : "Create Post"}
        </Button>
      </form>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
        active
          ? "bg-signal text-white"
          : "text-slate-dim dark:text-slate hover:text-signal"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  hint,
  rows = 3,
}) {
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
          className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
        />
      ) : (
        <input
          type={type}
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
