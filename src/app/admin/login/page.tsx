import { redirect } from "next/navigation";
import { isAdmin, loginWithPassword } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (await isAdmin()) {
    redirect("/admin");
  }

  async function action(formData: FormData) {
    "use server";
    const password = String(formData.get("password") || "");
    const ok = await loginWithPassword(password);
    if (!ok) redirect("/admin/login?error=1");
    redirect("/admin");
  }

  return (
    <div className="max-w-sm mx-auto pt-12">
      <div className="text-center mb-8">
        <div className="font-display text-2xl text-ink-100">только для меня</div>
        <p className="text-sm text-ink-400 mt-2">
          введи пароль чтобы загрузить трек или пост
        </p>
      </div>
      <form
        action={action}
        className="space-y-3 rounded-2xl border border-ink-800 bg-ink-900 p-6"
      >
        <label className="block text-xs text-ink-400">пароль</label>
        <input
          name="password"
          type="password"
          autoFocus
          required
          className="w-full bg-ink-950 border border-ink-800 rounded-md px-3 py-2 text-ink-100 focus:outline-none focus:border-ink-600"
        />
        {searchParams.error && (
          <div className="text-xs text-red-400">не подходит</div>
        )}
        <button className="w-full rounded-md bg-ink-100 text-ink-950 py-2 text-sm font-medium hover:bg-white transition">
          войти
        </button>
        <p className="text-[11px] text-ink-500 pt-3">
          стандартный пароль:{" "}
          <code className="text-ink-300">ibraim</code> (поменяй в settings или
          переменной <code className="text-ink-300">ADMIN_PASSWORD</code>)
        </p>
      </form>
    </div>
  );
}
