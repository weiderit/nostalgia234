import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { Cover } from "@/components/Cover";
import { StatusPill } from "@/components/TrackRow";
import { formatDate } from "@/lib/format";
import { deleteTrackAction } from "./actions";

export default async function AdminTracksPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  const tracks = [...db.tracks].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink-100">Треки</h1>
          <p className="text-sm text-ink-400 mt-1">
            {tracks.length} в библиотеке
          </p>
        </div>
        <Link
          href="/admin/tracks/new"
          className="rounded-md bg-ink-100 text-ink-950 px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          + загрузить трек
        </Link>
      </div>

      {tracks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-800 p-12 text-center text-ink-500">
          пусто. загрузи первый трек.
        </div>
      ) : (
        <div className="rounded-xl border border-ink-800 bg-ink-900 divide-y divide-ink-800">
          {tracks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-ink-850/50 transition-colors"
            >
              <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                <Cover src={t.cover} title={t.title} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-ink-100 truncate">{t.title}</div>
                <div className="text-xs text-ink-500 truncate">
                  {[t.genre, t.mood].filter(Boolean).join(" · ")}
                  {t.releaseDate ? ` · ${formatDate(t.releaseDate)}` : ""}
                </div>
              </div>
              <StatusPill status={t.status} />
              <Link
                href={`/admin/tracks/${t.id}`}
                className="text-xs text-ink-400 hover:text-ink-100 px-2"
              >
                редактировать
              </Link>
              <form action={deleteTrackAction}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  className="text-xs text-ink-500 hover:text-red-400 px-2"
                >
                  удалить
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
