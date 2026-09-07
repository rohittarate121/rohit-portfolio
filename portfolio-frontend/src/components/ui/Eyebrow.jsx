export default function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="font-mono text-xs uppercase tracking-widest text-signal">
        {children}
      </span>
    </div>
  );
}
