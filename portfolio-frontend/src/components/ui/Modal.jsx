import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-void/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-xl border border-void/10 dark:border-white/10 bg-white dark:bg-void-surface p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-void dark:text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-dim dark:text-slate hover:text-signal"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
