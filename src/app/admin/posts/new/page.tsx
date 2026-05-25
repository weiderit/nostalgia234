import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { PostForm } from "@/components/admin/PostForm";
import { createPostAction } from "../actions";

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink-100">новый пост</h1>
        <p className="text-sm text-ink-400 mt-1">
          видео из студии, текст, демо, сниппет, новость или заметка
        </p>
      </div>
      <PostForm action={createPostAction} submitLabel="опубликовать" />
    </div>
  );
}
