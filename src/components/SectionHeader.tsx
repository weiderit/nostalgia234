import type { ReactNode } from "react";

export function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-ink-100 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-ink-400 mt-1">{subtitle}</p>
        )}
      </div>
      {right && <div className="text-sm text-ink-400">{right}</div>}
    </div>
  );
}
