import { useEffect, useState } from "react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";
import { getAllExperiences } from "../../services/experienceService.js";
import { mapExperienceFromApi } from "../../utils/mapExperience.js";

function ExperienceCardSkeleton() {
  return (
    <Card className="p-6 sm:p-8 animate-pulse">
      <div className="h-5 w-1/3 bg-void/10 dark:bg-white/10 rounded mb-3" />
      <div className="h-4 w-1/4 bg-void/10 dark:bg-white/10 rounded mb-4" />
      <div className="h-3 w-full bg-void/5 dark:bg-white/5 rounded mb-2" />
      <div className="h-3 w-5/6 bg-void/5 dark:bg-white/5 rounded mb-5" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-void/10 dark:bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-void/10 dark:bg-white/10 rounded-full" />
      </div>
    </Card>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    getAllExperiences()
      .then((data) => {
        if (cancelled) return;
        setExperiences(data.map(mapExperienceFromApi));
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
      id="experience"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>GET /experience</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
          Experience
        </h2>

        {status === "loading" && (
          <div className="space-y-5">
            <ExperienceCardSkeleton />
            <ExperienceCardSkeleton />
          </div>
        )}

        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load experience right now — the API may be offline.
            Try refreshing.
          </Card>
        )}

        {status === "success" && experiences.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            No experience published yet.
          </Card>
        )}

        {status === "success" && experiences.length > 0 && (
          <div className="space-y-5">
            {experiences.map((e) => (
              <Card key={e.id} className="p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-display font-semibold text-xl">
                    {e.role}
                  </h3>
                  <span className="font-mono text-xs text-slate-dim dark:text-slate">
                    {e.duration}
                  </span>
                </div>
                <p className="text-signal font-medium text-sm mb-4">{e.org}</p>
                <ul className="space-y-1.5 mb-5 list-disc list-inside text-sm text-slate-dim dark:text-slate">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
