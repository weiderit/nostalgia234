import Link from "next/link";
import { getDB } from "@/lib/db";
import { TrackRow } from "@/components/TrackRow";
import { SectionHeader } from "@/components/SectionHeader";
import clsx from "clsx";

const FILTERS = [
  { id: "all", label: "Всё" },
  { id: "latest", label: "Последний релиз" },
  { id: "release", label: "Релизы" },
  { id: "archive", label: "Старое" },
  { id: "coming", label: "Невышедшее" },
  { id: "favorite", label: "Любимое" },
];

export default async function MusicPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const db = await getDB();
  const filter = searchParams.filter || "all";

  let tracks = [...db.tracks];
  let subtitle = "вся музыка";

  switch (filter) {
    case "latest":
      tracks = tracks
        .filter((t) => t.status === "release")
        .sort(
          (a, b) =>
            new Date(b.releaseDate || b.createdAt).getTime() -
            new Date(a.releaseDate || a.createdAt).getTime(),
        )
        .slice(0, 1);
      subtitle = "последний релиз";
      break;
    case "release":
      tracks = tracks.filter((t) => t.status === "release");
      subtitle = "официальные релизы";
      break;
    case "archive":
      tracks = tracks.filter((t) => t.status === "archive");
      subtitle = "старое из архива";
      break;
    case "coming":
      tracks = tracks.filter((t) => t.status === "coming");
      subtitle = "ещё не вышло";
      break;
    case "favorite":
      tracks = tracks.filter((t) => t.favorite);
      subtitle = "то, что слушаю сам";
      break;
    default:
      // sort by status order, then date
      tracks.sort((a, b) => {
        const order = { release: 0, coming: 1, demo: 2, archive: 3 };
        if (order[a.status] !== order[b.status])
          return order[a.status] - order[b.status];
        return (
          new Date(b.releaseDate || b.createdAt).getTime() -
          new Date(a.releaseDate || a.createdAt).getTime()
        );
      });
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Music" subtitle={subtitle} />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.id}
            href={f.id === "all" ? "/music" : `/music?filter=${f.id}`}
            className={clsx(
              "rounded-full px-3 py-1.5 text-xs border transition",
              filter === f.id
                ? "bg-ink-100 text-ink-950 border-ink-100"
                : "border-ink-800 text-ink-300 hover:border-ink-600 hover:text-ink-100",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {tracks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-800 p-12 text-center text-ink-500">
          здесь пока ничего нет
        </div>
      ) : (
        <div className="rounded-xl border border-ink-800 bg-ink-900/40 divide-y divide-ink-850/70">
          <div className="hidden md:grid grid-cols-[28px_48px_1fr_140px_60px] gap-4 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-ink-500">
            <span className="text-center">#</span>
            <span />
            <span>трек</span>
            <span>статус</span>
            <span className="text-right">♥</span>
          </div>
          {tracks.map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} queue={tracks} />
          ))}
        </div>
      )}
    </div>
  );
}
