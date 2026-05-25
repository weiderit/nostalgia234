import Link from "next/link";
import { getDB } from "@/lib/db";
import { SectionHeader } from "@/components/SectionHeader";
import { relativeDate } from "@/lib/format";

const KIND_LABEL: Record<string, string> = {
  text: "запись",
  video: "видео",
  demo: "демо",
  snippet: "сниппет",
  news: "новость",
  note: "заметка",
};

export default async function PostsPage() {
  const db = await getDB();
  const posts = [...db.posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Posts"
        subtitle="дневник: студия, демки, мысли, новости"
      />

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-800 p-12 text-center text-ink-500">
          пока тихо
        </div>
      ) : (
        <ol className="relative border-l border-ink-800 ml-3 space-y-6">
          {posts.map((p) => (
            <li key={p.id} className="relative pl-6">
              <span className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-ink-600 ring-4 ring-ink-950" />
              <Link
                href={`/post/${p.id}`}
                className="block rounded-xl bg-ink-900 border border-ink-800 hover:border-ink-700 p-5 transition-colors"
              >
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  <span>{KIND_LABEL[p.kind] || p.kind}</span>
                  <span className="text-ink-600">·</span>
                  <span>{relativeDate(p.createdAt)}</span>
                </div>
                <h3 className="font-display text-xl text-ink-100 mt-2">
                  {p.title}
                </h3>
                {p.body && (
                  <p className="text-sm text-ink-300 mt-2 leading-relaxed line-clamp-4 whitespace-pre-wrap">
                    {p.body}
                  </p>
                )}
                {p.media.length > 0 && (
                  <div className="mt-3 text-[11px] text-ink-500">
                    {p.media.length} вложени{p.media.length === 1 ? "е" : p.media.length < 5 ? "я" : "й"}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
