const variants = {
  primary: "bg-signal text-white hover:bg-signal-dim border border-signal",
  secondary:
    "bg-transparent text-void dark:text-ink border border-void/15 dark:border-white/15 hover:border-signal hover:text-signal dark:hover:border-signal dark:hover:text-signal",
  ghost:
    "bg-transparent text-slate-dim dark:text-slate hover:text-signal dark:hover:text-signal",
  danger: "bg-red-500 text-white hover:bg-red-600 border border-red-500",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium font-mono tracking-tight transition-colors duration-150 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
