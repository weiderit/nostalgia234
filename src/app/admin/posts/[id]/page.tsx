import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { PostForm } from "@/components/admin/PostForm";
import { updatePostAction, removeMediaAction } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  const post = db.posts.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-2xl text-ink-100">
          редактировать: {post.title}
        </h1>
      </div>
      <PostForm action={updatePostAction} post={post} />

      {post.media.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
            вложения ({post.media.length})
          </div>
          <ul className="space-y-2">
            {post.media.map((m) => (
              <li
                key={m.id}
                className="flex items-center gap-3 rounded-md border border-ink-800 bg-ink-900 px-3 py-2"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500 w-12">
                  {m.kind}
                </span>
                <span className="flex-1 text-xs text-ink-300 truncate">
                  {m.url}
                </span>
                <form action={removeMediaAction}>
                  <input type="hidden" name="postId" value={post.id} />
                  <input type="hidden" name="mediaId" value={m.id} />
                  <button className="text-xs text-ink-500 hover:text-red-400">
                    удалить
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
