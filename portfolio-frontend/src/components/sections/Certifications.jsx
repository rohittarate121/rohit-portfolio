import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Card from "../ui/Card.jsx";
import { getAllCertifications } from "../../services/certificationService.js";
import { mapCertificationFromApi } from "../../utils/mapCertification.js";

function CertificationCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="h-5 w-3/4 bg-void/10 dark:bg-white/10 rounded mb-3" />
      <div className="h-3 w-1/2 bg-void/5 dark:bg-white/5 rounded" />
    </Card>
  );
}

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    getAllCertifications()
      .then((data) => {
        if (cancelled) return;
        setCertifications(data.map(mapCertificationFromApi));
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
      id="certifications"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>GET /certifications</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
          Certifications
        </h2>

        {status === "loading" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <CertificationCardSkeleton />
          </div>
        )}

        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load certifications right now — the API may be
            offline. Try refreshing.
          </Card>
        )}

        {status === "success" && certifications.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            No certifications published yet.
          </Card>
        )}

        {status === "success" && certifications.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((c) => (
              <Card
                key={c.id}
                className="p-6 hover:border-signal/40 transition-colors"
              >
                <h3 className="font-display font-semibold text-base leading-snug mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-signal font-mono mb-1">{c.org}</p>
                <p className="text-xs text-slate-dim dark:text-slate mb-4">
                  {c.date}
                </p>

                {c.credentialId && (
                  <p className="text-[11px] font-mono text-slate-dim dark:text-slate mb-3">
                    Credential ID: {c.credentialId}
                  </p>
                )}

                {(c.verifyUrl || c.certificateUrl) && (
                  <div className="flex items-center gap-4 pt-3 border-t border-void/10 dark:border-white/10">
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-signal hover:gap-1.5 transition-all"
                      >
                        Verify <ExternalLink size={12} />
                      </a>
                    )}
                    {c.certificateUrl && (
                      <a
                        href={c.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-signal hover:gap-1.5 transition-all"
                      >
                        Certificate <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
