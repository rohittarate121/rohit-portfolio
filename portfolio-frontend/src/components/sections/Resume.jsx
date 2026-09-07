import { useEffect, useState } from "react";
import { Download, Eye, EyeOff, FileText } from "lucide-react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";
import { getResume } from "../../services/resumeService.js";

function formatUpdatedDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | notset | error
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    getResume()
      .then((data) => {
        setResumeUrl(data.resumeUrl);
        setUpdatedAt(data.updatedAt);
        setStatus("success");
      })
      .catch((err) => {
        setStatus(err.response?.status === 404 ? "notset" : "error");
      });
  }, []);

  return (
    <section
      id="resume"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-2xl mx-auto">
        <Eyebrow>GET /resume</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Resume
        </h2>
        <p className="text-slate-dim dark:text-slate mb-10 max-w-xl">
          Open it directly, or preview it right here.
        </p>

        {status === "loading" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Loading…
          </Card>
        )}
        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load the resume right now — try refreshing.
          </Card>
        )}
        {status === "notset" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Resume coming soon.
          </Card>
        )}

        {status === "success" && (
          <Card className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-signal/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-signal" />
                </div>
                <div>
                  <p className="text-sm font-medium text-void dark:text-ink">
                    Rohit Tarate — Resume
                  </p>
                  {updatedAt && (
                    <p className="text-xs font-mono text-slate-dim dark:text-slate">
                      Updated {formatUpdatedDate(updatedAt)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setPreviewOpen((o) => !o)}
                >
                  {previewOpen ? <EyeOff size={16} /> : <Eye size={16} />}
                  {previewOpen ? "Hide Preview" : "Preview"}
                </Button>
                <Button
                  as="a"
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  <Download size={16} /> Open Resume
                </Button>
              </div>
            </div>

            {previewOpen && (
              <div className="mt-6 pt-6 border-t border-void/10 dark:border-white/10">
                <div className="aspect-[8.5/11] sm:aspect-[8.5/7] w-full rounded-lg overflow-hidden bg-mist-soft dark:bg-void-soft">
                  <object
                    data={resumeUrl}
                    type="application/pdf"
                    className="w-full h-full"
                    aria-label="Resume preview"
                  >
                    <div className="w-full h-full flex items-center justify-center text-sm text-slate-dim dark:text-slate p-8 text-center">
                      Preview isn&rsquo;t available for this link — use "Open
                      Resume" instead.
                    </div>
                  </object>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </section>
  );
}
