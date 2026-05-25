import Link from "next/link";
import { getDB } from "@/lib/db";
import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import { TrackRow, StatusPill } from "@/components/TrackRow";
import { toPlayable } from "@/lib/playable";
import { TrackCard } from "@/components/TrackCard";
import { SectionHeader } from "@/components/SectionHeader";
import { formatDate, latestRelease, relativeDate } from "@/lib/format";

export default async function HomePage() {
  const db = await getDB();
  const releases = db.tracks.filter((t) => t.status === "release");
  const demos = db.tracks.filter((t) => t.status === "demo");
  const archive = db.tracks.filter((t) => t.status === "archive");
  const coming = db.tracks.filter((t) => t.status === "coming");
  const favs = db.tracks.filter((t) => t.favorite);

  const featured = latestRelease(releases) || db.tracks[0];
  const heroQueue = releases.slice(0, 8).map(toPlayable);
  const recentPosts = [...db.posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {featured && (
        <section className="rounded-2xl bg-gradient-to-b from-ink-800/80 to-ink-900 border border-ink-800 p-6 md:p-8 animate-rise">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl shadow-black/50 shrink-0 ring-1 ring-ink-800">
              <Cover
                src={featured.cover}
                title={featured.title}
                rounded="none"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-400">
                последний релиз
              </div>
              <h1 className="font-display text-3xl md:text-5xl text-ink-100 mt-2 leading-tight">
                {featured.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-ink-400">
                <StatusPill status={featured.status} />
                {featured.releaseDate && (
                  <span>{formatDate(featured.releaseDate)}</span>
                )}
                {featured.genre && <span>· {featured.genre}</span>}
                {featured.mood && <span>· {featured.mood}</span>}
              </div>
              {featured.description && (
                <p className="text-ink-300 mt-4 max-w-xl leading-relaxed">
                  {featured.description}
                </p>
              )}
              <div className="mt-6 flex items-center gap-3">
                <PlayButton
                  track={toPlayable(featured)}
                  queue={heroQueue}
                  label="Play"
                  size="lg"
                />
                <Link
                  href={`/track/${featured.id}`}
                  className="text-sm text-ink-300 hover:text-ink-100 underline-offset-4 hover:underline"
                >
                  открыть страницу трека →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {releases.length > 0 && (
        <section>
          <SectionHeader
            title="Последний релиз"
            subtitle="всё, что вышло — в одном месте"
            right={<Link href="/music" className="hover:text-ink-100">все треки →</Link>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {releases.slice(0, 4).map((t) => (
              <TrackCard key={t.id} track={t} queue={releases} />
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Collection
          title="Демки"
          subtitle="сырое, без полировки"
          href="/demos"
          tracks={demos.slice(0, 4)}
          queue={demos}
        />
        <Collection
          title="Старое"
          subtitle="из архива"
          href="/music?filter=archive"
          tracks={archive.slice(0, 4)}
          queue={archive}
        />
        <Collection
          title="Невышедшее"
          subtitle="скоро"
          href="/music?filter=coming"
          tracks={coming.slice(0, 4)}
          queue={coming}
        />
        <Collection
          title="Любимое"
          subtitle="то, что слушаю сам"
          href="/music?filter=favorite"
          tracks={favs.slice(0, 4)}
          queue={favs}
        />
      </section>

      {recentPosts.length > 0 && (
        <section>
          <SectionHeader
            title="Из дневника"
            subtitle="видео из студии, демки, заметки"
            right={<Link href="/posts" className="hover:text-ink-100">все записи →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map((p) => (
              <Link
                key={p.id}
                href={`/post/${p.id}`}
                className="block rounded-xl bg-ink-850 hover:bg-ink-800 p-4 transition-colors border border-ink-800"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  {p.kind}
                </div>
                <div className="font-display text-lg text-ink-100 mt-1">
                  {p.title}
                </div>
                {p.body && (
                  <p className="text-sm text-ink-400 mt-2 line-clamp-3">
                    {p.body}
                  </p>
                )}
                <div className="text-[11px] text-ink-500 mt-3">
                  {relativeDate(p.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Collection({
  title,
  subtitle,
  href,
  tracks,
  queue,
}: {
  title: string;
  subtitle: string;
  href: string;
  tracks: Awaited<ReturnType<typeof getDB>>["tracks"];
  queue: Awaited<ReturnType<typeof getDB>>["tracks"];
}) {
  return (
    <div className="rounded-xl bg-ink-900 border border-ink-800 p-4">
      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="font-display text-lg text-ink-100">{title}</div>
          <div className="text-xs text-ink-500">{subtitle}</div>
        </div>
        <Link href={href} className="text-xs text-ink-400 hover:text-ink-100">
          →
        </Link>
      </div>
      {tracks.length === 0 ? (
        <div className="text-sm text-ink-500 py-8 text-center">пусто</div>
      ) : (
        <div className="divide-y divide-ink-850/70">
          {tracks.map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} queue={queue} />
          ))}
        </div>
      )}
    </div>
  );
}
