import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { relativeDate } from "@/lib/format";
import { deletePostAction } from "./actions";

export default async function AdminPostsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  const posts = [...db.posts].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink-100">Посты</h1>
          <p className="text-sm text-ink-400 mt-1">{posts.length} в дневнике</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-ink-100 text-ink-950 px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          + новый пост
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-800 p-12 text-center text-ink-500">
          пусто. напиши первый пост.
        </div>
      ) : (
        <div className="rounded-xl border border-ink-800 bg-ink-900 divide-y divide-ink-800">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-ink-850/50 transition"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm text-ink-100 truncate">{p.title}</div>
                <div className="text-xs text-ink-500 truncate">
                  {p.kind} · {relativeDate(p.createdAt)} ·{" "}
                  {p.media.length} вложений
                </div>
              </div>
              <Link
                href={`/admin/posts/${p.id}`}
                className="text-xs text-ink-400 hover:text-ink-100 px-2"
              >
                редактировать
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={p.id} />
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
