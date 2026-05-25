import { getDB } from "@/lib/db";
import { SectionHeader } from "@/components/SectionHeader";

export default async function AboutPage() {
  const db = await getDB();
  const s = db.settings;
  const totals = {
    releases: db.tracks.filter((t) => t.status === "release").length,
    demos: db.tracks.filter((t) => t.status === "demo").length,
    archive: db.tracks.filter((t) => t.status === "archive").length,
    coming: db.tracks.filter((t) => t.status === "coming").length,
  };

  return (
    <div className="space-y-10 max-w-2xl">
      <SectionHeader title="About" subtitle={`${s.artistName} — ${s.location || ""}`} />

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-ink-200 leading-relaxed whitespace-pre-wrap">
          {s.about}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="релизов" value={totals.releases} />
        <Stat label="демок" value={totals.demos} />
        <Stat label="в архиве" value={totals.archive} />
        <Stat label="скоро" value={totals.coming} />
      </div>

      {s.links.length > 0 && (
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-3">
            Где ещё
          </div>
          <ul className="space-y-2">
            {s.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-200 hover:text-ink-100 underline-offset-4 hover:underline"
                >
                  {l.label}{" "}
                  <span className="text-ink-500 text-xs">→ {l.url.replace(/^https?:\/\//, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-ink-500 pt-8 border-t border-ink-800">
        этот сайт — мой архив. здесь нет рекламы, нет рекомендаций.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-900 p-4">
      <div className="font-display text-3xl text-ink-100">{value}</div>
      <div className="text-xs text-ink-500 mt-1">{label}</div>
    </div>
  );
}
