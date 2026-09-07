export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-void/10 dark:border-white/10 bg-void/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-slate-dim dark:text-slate ${className}`}
    >
      {children}
    </span>
  );
}
