export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary:
      "bg-[var(--ha-primary)] text-white hover:opacity-95 focus:ring-[var(--ha-primary)]",
    outline:
      "border border-[var(--ha-border)] bg-white text-[var(--ha-text)] hover:bg-slate-50 focus:ring-slate-400",
    accent:
      "bg-[var(--ha-accent)] text-slate-900 hover:opacity-95 focus:ring-[var(--ha-accent)]",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
