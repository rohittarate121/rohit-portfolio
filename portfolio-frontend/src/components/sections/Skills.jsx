import { useEffect, useState } from "react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Card from "../ui/Card.jsx";
import { getAllSkills } from "../../services/skillService.js";
import { groupSkillsByCategory } from "../../utils/groupSkills.js";

const levelColor = {
  Primary: "bg-signal",
  Strong: "bg-uptime",
  "Working Knowledge": "bg-slate-dim dark:bg-slate",
};

function SkillCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="h-3 w-24 bg-void/10 dark:bg-white/10 rounded mb-2" />
      <div className="h-5 w-32 bg-void/10 dark:bg-white/10 rounded mb-4" />
      <div className="space-y-2.5">
        <div className="h-4 w-full bg-void/5 dark:bg-white/5 rounded" />
        <div className="h-4 w-5/6 bg-void/5 dark:bg-white/5 rounded" />
        <div className="h-4 w-4/6 bg-void/5 dark:bg-white/5 rounded" />
      </div>
    </Card>
  );
}

export default function Skills() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    getAllSkills()
      .then((data) => {
        if (cancelled) return;
        setCategories(groupSkillsByCategory(data));
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
      id="skills"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>GET /skills</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Skills
        </h2>
        <p className="text-slate-dim dark:text-slate mb-12 max-w-xl">
          Grouped by domain, not inflated by percentages.
        </p>

        {status === "loading" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <SkillCardSkeleton />
            <SkillCardSkeleton />
            <SkillCardSkeleton />
          </div>
        )}

        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load skills right now — the API may be offline. Try
            refreshing.
          </Card>
        )}

        {status === "success" && categories.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            No skills published yet.
          </Card>
        )}

        {status === "success" && categories.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Card
                key={cat.category}
                className="p-6 hover:border-signal/40 transition-colors group"
              >
                <p className="font-mono text-[11px] text-slate-dim dark:text-slate mb-1">
                  {cat.endpoint}
                </p>
                <h3 className="font-display font-semibold text-lg mb-4">
                  {cat.category}
                </h3>
                <ul className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-void dark:text-ink">{s.name}</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${levelColor[s.level]}`}
                        />
                        <span className="text-[11px] font-mono text-slate-dim dark:text-slate">
                          {s.level}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
