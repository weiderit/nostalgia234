import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { saveSettingsAction, changePasswordAction } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { saved?: string; pwsaved?: string; pwerror?: string };
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  const s = db.settings;
  const linksText = s.links.map((l) => `${l.label} | ${l.url}`).join("\n");

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="font-display text-2xl text-ink-100">настройки</h1>
        <p className="text-sm text-ink-400 mt-1">
          имя, описание, ссылки, пароль
        </p>
      </div>

      <form action={saveSettingsAction} className="space-y-5">
        <Field label="имя артиста">
          <input
            name="artistName"
            defaultValue={s.artistName}
            className="input"
          />
        </Field>
        <Field label="название сайта">
          <input name="siteName" defaultValue={s.siteName} className="input" />
        </Field>
        <Field label="короткий tagline">
          <input name="tagline" defaultValue={s.tagline} className="input" />
        </Field>
        <Field label="о себе (для страницы About)">
          <textarea
            name="about"
            defaultValue={s.about}
            rows={6}
            className="input"
          />
        </Field>
        <Field label="место / контекст">
          <input
            name="location"
            defaultValue={s.location || ""}
            className="input"
            placeholder="например: ночью у окна"
          />
        </Field>
        <Field label="ссылки (по одной на строку: label | url)">
          <textarea
            name="links"
            defaultValue={linksText}
            rows={5}
            className="input font-mono text-xs"
          />
        </Field>
        <button
          type="submit"
          className="rounded-md bg-ink-100 text-ink-950 px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          сохранить
        </button>
        {searchParams.saved && (
          <span className="ml-3 text-xs text-emerald-400">сохранено</span>
        )}
      </form>

      <div className="border-t border-ink-800 pt-8">
        <h2 className="font-display text-xl text-ink-100">пароль</h2>
        <p className="text-sm text-ink-400 mt-1">
          смени, если использовал стандартный
        </p>
        <form action={changePasswordAction} className="space-y-3 mt-4">
          <Field label="новый пароль">
            <input
              type="password"
              name="password"
              minLength={4}
              required
              className="input"
            />
          </Field>
          <button
            type="submit"
            className="rounded-md bg-ink-800 text-ink-100 px-4 py-2 text-sm hover:bg-ink-700 transition border border-ink-700"
          >
            обновить пароль
          </button>
          {searchParams.pwsaved && (
            <span className="ml-3 text-xs text-emerald-400">обновлён</span>
          )}
          {searchParams.pwerror && (
            <span className="ml-3 text-xs text-red-400">
              минимум 4 символа
            </span>
          )}
        </form>
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
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
