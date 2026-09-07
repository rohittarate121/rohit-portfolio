import { useEffect, useState } from "react";
import Eyebrow from "../ui/Eyebrow.jsx";
import { profile, timeline } from "../../data/portfolio.js";
import { getAllEducation } from "../../services/educationService.js";
import { mapEducationFromApi } from "../../utils/mapEducation.js";

function EducationSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border-l-2 border-signal/10 pl-4 animate-pulse">
        <div className="h-4 w-2/3 bg-void/10 dark:bg-white/10 rounded mb-2" />
        <div className="h-3 w-1/2 bg-void/5 dark:bg-white/5 rounded" />
      </div>
      <div className="border-l-2 border-signal/10 pl-4 animate-pulse">
        <div className="h-4 w-2/3 bg-void/10 dark:bg-white/10 rounded mb-2" />
        <div className="h-3 w-1/2 bg-void/5 dark:bg-white/5 rounded" />
      </div>
    </div>
  );
}

export default function About() {
  const [education, setEducation] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    getAllEducation()
      .then((data) => {
        if (cancelled) return;
        setEducation(data.map(mapEducationFromApi));
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
      id="about"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-16">
        <div>
          <Eyebrow>$ whoami</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            About
          </h2>
          <p className="text-slate-dim dark:text-slate leading-relaxed mb-6">
            {profile.objective}
          </p>

          {status === "loading" && <EducationSkeleton />}

          {status === "error" && (
            <p className="text-sm text-amber font-mono">
              Couldn&rsquo;t load education right now.
            </p>
          )}

          {status === "success" && (
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.id} className="border-l-2 border-signal/30 pl-4">
                  <p className="font-medium text-void dark:text-ink">
                    {e.degree}
                  </p>
                  <p className="text-sm text-slate-dim dark:text-slate">
                    {e.school} &middot; {e.period}
                    {e.detail ? ` · ${e.detail}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate-dim dark:text-slate mb-6">
            Path so far
          </p>
          <ol className="relative border-l border-void/10 dark:border-white/10 space-y-8 ml-2">
            {timeline.map((t) => (
              <li key={t.label} className="ml-6">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-signal" />
                <p className="text-sm font-mono text-void dark:text-ink">
                  {t.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
