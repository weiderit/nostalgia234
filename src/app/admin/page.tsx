import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";

export default async function AdminHome() {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink-100">панель</h1>
        <p className="text-sm text-ink-400 mt-1">
          здесь ты управляешь своей библиотекой
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Треки"
          value={db.tracks.length}
          href="/admin/tracks"
          hint="загрузить, отредактировать, удалить"
        />
        <Card
          title="Посты"
          value={db.posts.length}
          href="/admin/posts"
          hint="дневник, видео, заметки"
        />
        <Card
          title="Настройки"
          value="—"
          href="/admin/settings"
          hint="имя, описание, пароль"
        />
      </div>

      <div className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
          подсказка
        </div>
        <p className="text-ink-200 mt-2 text-sm leading-relaxed">
          Файлы (mp3, обложки, видео) сохраняются в{" "}
          <code className="text-ink-300">/public/uploads</code>. Сам сайт публичен
          и доступен всем без пароля — пароль защищает только эту админку.
        </p>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  href,
  hint,
}: {
  title: string;
  value: number | string;
  href: string;
  hint: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-ink-800 bg-ink-900 hover:border-ink-700 p-5 transition-colors"
    >
      <div className="text-xs uppercase tracking-[0.22em] text-ink-500">
        {title}
      </div>
      <div className="font-display text-3xl text-ink-100 mt-2">{value}</div>
      <div className="text-xs text-ink-400 mt-2">{hint}</div>
    </Link>
  );
}
