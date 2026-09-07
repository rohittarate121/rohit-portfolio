export default function Card({ children, className = "", as: Component = "div", ...props }) {
  return (
    <Component
      className={`rounded-xl border border-void/10 dark:border-white/10 bg-white dark:bg-void-surface transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
