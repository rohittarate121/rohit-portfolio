import { useEffect, useState } from "react";
import { Eye, Download, Mail, FolderKanban } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import Card from "../../components/ui/Card.jsx";
import { getAnalyticsSummary } from "../../services/analyticsService.js";
import { getAllProjects } from "../../services/projectService.js";

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg bg-signal/10 flex items-center justify-center">
          <Icon size={16} className="text-signal" />
        </div>
        <span className="text-xs font-mono text-slate-dim dark:text-slate uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="font-display text-3xl font-semibold">{value}</p>
    </Card>
  );
}

export default function AdminOverview() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    Promise.all([getAnalyticsSummary(), getAllProjects()])
      .then(([summaryData, projectsData]) => {
        setSummary(summaryData);
        setProjects(
          [...projectsData].sort(
            (a, b) => (b.viewCount || 0) - (a.viewCount || 0),
          ),
        );
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
        GET /analytics/summary
      </p>
      <h1 className="font-display text-2xl font-semibold mb-2">
        Welcome back, {user?.username}.
      </h1>
      <p className="text-sm text-slate-dim dark:text-slate mb-8">
        Signed in as <span className="font-mono">{user?.role}</span>.
      </p>

      {status === "loading" && (
        <p className="text-sm text-slate-dim dark:text-slate">
          Loading analytics…
        </p>
      )}

      {status === "error" && (
        <Card className="p-6 text-sm text-slate-dim dark:text-slate">
          Couldn&rsquo;t load analytics right now.
        </Card>
      )}

      {status === "success" && (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon={Eye}
              label="Site Visits"
              value={summary.totalVisits}
            />
            <StatCard
              icon={Download}
              label="Resume Downloads"
              value={summary.resumeDownloads}
            />
            <StatCard
              icon={Mail}
              label="Contact Messages"
              value={summary.totalContactMessages}
            />
          </div>

          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <FolderKanban size={16} className="text-signal" /> Views by Project
          </h2>
          <Card className="overflow-hidden">
            {projects.length === 0 ? (
              <div className="p-6 text-sm text-slate-dim dark:text-slate">
                No projects yet.
              </div>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {projects.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-void/5 dark:border-white/5 last:border-0"
                    >
                      <td className="px-5 py-3 font-medium">{p.title}</td>
                      <td className="px-5 py-3 text-right font-mono text-slate-dim dark:text-slate">
                        {p.viewCount ?? 0} views
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
