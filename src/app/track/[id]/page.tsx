import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import { TrackRow, StatusPill } from "@/components/TrackRow";
import { toPlayable } from "@/lib/playable";
import { formatDate } from "@/lib/format";

export default async function TrackPage({
  params,
}: {
  params: { id: string };
}) {
  const db = await getDB();
  const track = db.tracks.find((t) => t.id === params.id);
  if (!track) return notFound();

  const related = db.tracks
    .filter((t) => t.id !== track.id && t.status === track.status)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Link
        href="/music"
        className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink-100"
      >
        ← вся музыка
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-ink-800">
          <Cover src={track.cover} title={track.title} rounded="none" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-400">
            <StatusPill status={track.status} />
            {track.releaseDate && <span>{formatDate(track.releaseDate)}</span>}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink-100 mt-3 leading-tight">
            {track.title}
          </h1>
          <div className="text-sm text-ink-400 mt-2 flex flex-wrap gap-x-3">
            {track.genre && <span>{track.genre}</span>}
            {track.mood && <span>· {track.mood}</span>}
            {track.favorite && <span>· ♥ любимое</span>}
          </div>

          {track.description && (
            <p className="text-ink-200 mt-5 leading-relaxed max-w-2xl">
              {track.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <PlayButton
              track={toPlayable(track)}
              queue={[toPlayable(track)]}
              label={track.audio ? "Play" : "Послушать"}
            />
            {!track.audio && (
              <span className="text-xs text-ink-500">
                {track.status === "coming"
                  ? "трек ещё не загружен"
                  : "превью пока недоступно"}
              </span>
            )}
          </div>
        </div>
      </section>

      {track.note && (
        <section className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6 md:p-8 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">
            заметка от автора
          </div>
          <p className="text-ink-200 leading-relaxed whitespace-pre-wrap">
            {track.note}
          </p>
        </section>
      )}

      {track.lyrics && (
        <section className="max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-3">
            текст
          </div>
          <pre className="font-sans text-ink-200 leading-relaxed whitespace-pre-wrap">
            {track.lyrics}
          </pre>
        </section>
      )}

      {track.attachments.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-3">
            вложения
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
            {track.attachments.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-ink-800 bg-ink-900 hover:border-ink-700 p-4 transition"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  {a.kind}
                </div>
                <div className="text-ink-100 mt-1">
                  {a.title || a.url.split("/").pop()}
                </div>
                {a.note && (
                  <p className="text-xs text-ink-400 mt-1">{a.note}</p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-3">
            похожее
          </div>
          <div className="rounded-xl border border-ink-800 bg-ink-900/40 divide-y divide-ink-850/70">
            {related.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} queue={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
