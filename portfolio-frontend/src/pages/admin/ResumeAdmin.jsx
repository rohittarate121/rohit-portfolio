import { useEffect, useState } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import { getResume, updateResume } from "../../services/resumeService.js";

export default function ResumeAdmin() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getResume()
      .then((data) => {
        setUrl(data.resumeUrl);
        setCurrentUrl(data.resumeUrl);
      })
      .catch(() => {
        // No resume set yet — genuinely empty, not an error.
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    if (!url.trim()) {
      setError("Enter a URL first.");
      return;
    }
    setIsSaving(true);
    try {
      const data = await updateResume(url.trim());
      setCurrentUrl(data.resumeUrl);
      setSaved(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong — check the URL and try again.",
      );
    } finally {
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
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold mb-2">Resume</h1>
      <p className="text-sm text-slate-dim dark:text-slate mb-6">
        No file upload here on purpose — point this at a link that stays current
        on its own.
      </p>

      <Card className="p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
              Resume URL
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/YOUR_DOC_ID/export?format=pdf"
              className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink font-mono"
            />
          </label>

          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
          {saved && (
            <p className="text-sm text-uptime font-mono flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Saved — the public Resume section now
              points here.
            </p>
          )}

          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </form>
      </Card>

      {currentUrl && (
        <a
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-signal hover:gap-2.5 transition-all"
        >
          Open current link <ExternalLink size={14} />
        </a>
      )}

      <div className="mt-10 pt-6 border-t border-void/10 dark:border-white/10 text-sm text-slate-dim dark:text-slate space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-dim dark:text-slate mb-2">
          Using Google Docs (recommended)
        </p>
        <p>
          1. Open your resume doc → <strong>Share</strong> → set to "Anyone with
          the link" can view.
        </p>
        <p>
          2. Copy the doc's ID — the long string between{" "}
          <code className="font-mono text-signal">/d/</code> and{" "}
          <code className="font-mono text-signal">/edit</code> in its URL.
        </p>
        <p>
          3. Paste above, with your real ID:{" "}
          <code className="font-mono text-signal">
            https://docs.google.com/document/d/YOUR_DOC_ID/export?format=pdf
          </code>
        </p>
        <p>
          From then on, editing and saving the doc updates what visitors see —
          nothing here needs to change again.
        </p>
      </div>
    </div>
  );
}
