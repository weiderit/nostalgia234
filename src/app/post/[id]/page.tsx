import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { formatDate, relativeDate } from "@/lib/format";

const KIND_LABEL: Record<string, string> = {
  text: "запись",
  video: "видео",
  demo: "демо",
  snippet: "сниппет",
  news: "новость",
  note: "заметка",
};

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const db = await getDB();
  const post = db.posts.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl space-y-6">
      <Link href="/posts" className="text-sm text-ink-400 hover:text-ink-100">
        ← все записи
      </Link>

      <header className="space-y-3">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 flex items-center gap-3">
          <span>{KIND_LABEL[post.kind] || post.kind}</span>
          <span className="text-ink-600">·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="text-ink-600">·</span>
          <span>{relativeDate(post.createdAt)}</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-ink-100 leading-tight">
          {post.title}
        </h1>
      </header>

      {post.body && (
        <div className="text-ink-200 leading-relaxed whitespace-pre-wrap text-[15px]">
          {post.body}
        </div>
      )}

      {post.media.length > 0 && (
        <div className="space-y-4 pt-4">
          {post.media.map((m) => (
            <figure
              key={m.id}
              className="rounded-xl border border-ink-800 bg-ink-900 overflow-hidden"
            >
              {m.kind === "image" && (
                <img src={m.url} alt={m.caption || ""} className="w-full" />
              )}
              {m.kind === "video" && (
                <video src={m.url} controls className="w-full" />
              )}
              {m.kind === "audio" && (
                <div className="p-4">
                  <audio src={m.url} controls className="w-full" />
                </div>
              )}
              {m.caption && (
                <figcaption className="px-4 py-2 text-xs text-ink-400 border-t border-ink-800">
                  {m.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}
