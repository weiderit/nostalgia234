import { getDB } from "@/lib/db";
import { TrackRow } from "@/components/TrackRow";
import { SectionHeader } from "@/components/SectionHeader";

export default async function DemosPage() {
  const db = await getDB();
  const demos = db.tracks.filter((t) => t.status === "demo");

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Demos"
        subtitle="сырые наброски и идеи. без полировки, как есть."
      />

      {demos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-800 p-12 text-center text-ink-500">
          демок пока нет
        </div>
      ) : (
        <div className="rounded-xl border border-ink-800 bg-ink-900/40 divide-y divide-ink-850/70">
          {demos.map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} queue={demos} />
          ))}
        </div>
      )}
    </div>
  );
}
