import type { Post } from "@/lib/types";

export function PostForm({
  action,
  post,
  submitLabel = "сохранить",
}: {
  action: (fd: FormData) => void | Promise<void>;
  post?: Post;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <Field label="заголовок" required>
        <input
          name="title"
          defaultValue={post?.title || ""}
          required
          className="input"
        />
      </Field>

      <Field label="тип">
        <select
          name="kind"
          defaultValue={post?.kind || "text"}
          className="input"
        >
          <option value="text">текст</option>
          <option value="note">заметка</option>
          <option value="video">видео из студии</option>
          <option value="demo">демо</option>
          <option value="snippet">сниппет</option>
          <option value="news">новость</option>
        </select>
      </Field>

      <Field label="текст">
        <textarea
          name="body"
          defaultValue={post?.body || ""}
          rows={8}
          className="input"
          placeholder="что хочешь сказать"
        />
      </Field>

      <Field label="вложения (можно несколько: фото, видео, аудио)">
        <input
          type="file"
          name="media"
          accept="image/*,video/*,audio/*"
          multiple
          className="input-file"
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-ink-100 text-ink-950 px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          {submitLabel}
        </button>
        <a
          href="/admin/posts"
          className="text-sm text-ink-400 hover:text-ink-100"
        >
          отмена
        </a>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: #0a0a0b;
          border: 1px solid #23252a;
          border-radius: 6px;
          padding: 8px 12px;
          color: #ebecef;
          font-size: 14px;
          outline: none;
        }
        .input:focus { border-color: #494c55; }
        .input-file {
          width: 100%;
          background: transparent;
          color: #a8acb5;
          font-size: 13px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-1.5">
        {label}
        {required && <span className="text-accent-warm"> *</span>}
      </span>
      {children}
    </label>
  );
}
