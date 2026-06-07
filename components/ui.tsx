import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="actions">{actions}</div> : null}
    </header>
  );
}

export function MetricCard({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <section className="metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
      {note ? <span>{note}</span> : null}
    </section>
  );
}

export function Badge({ label, tone = "neutral" }: { label: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge ${tone}`}>{String(label)}</span>;
}

export function DateCell({ value, time = false }: { value: string | null | undefined; time?: boolean }) {
  if (!value) return <>-</>;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return <>{value}</>;

  return (
    <>
      {date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
      {time
        ? ` ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}`
        : ""}
    </>
  );
}

export function FilterLinks({
  basePath,
  current,
  options,
}: {
  basePath: string;
  current: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <nav className="filter-links">
      {options.map((option) => (
        <Link
          key={option.value}
          className={current === option.value ? "active" : undefined}
          href={`${basePath}?view=${option.value}` as Route}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
