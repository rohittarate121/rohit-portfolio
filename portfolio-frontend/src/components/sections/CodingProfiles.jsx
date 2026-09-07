import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Card from "../ui/Card.jsx";
import { codingProfiles } from "../../data/portfolio.js";

export default function CodingProfiles() {
  return (
    <section id="profiles" className="py-28 px-6 border-t border-void/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>GET /profiles</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
          Coding Profiles
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {codingProfiles.map((p) =>
            p.isPlaceholder ? (
              <Card key={p.platform} className="p-5 opacity-50">
                <p className="font-mono font-medium">{p.platform}</p>
                <p className="text-xs text-amber mt-1 font-mono">not linked yet</p>
              </Card>
            ) : (
              <Card
                key={p.platform}
                as="a"
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="p-5 flex items-center justify-between hover:border-signal/40 transition-colors group"
              >
                <div>
                  <p className="font-mono font-medium">{p.platform}</p>
                  <p className="text-xs text-slate-dim dark:text-slate mt-1">{p.handle}</p>
                </div>
                <ArrowUpRight size={16} className="text-slate-dim dark:text-slate group-hover:text-signal transition-colors" />
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
