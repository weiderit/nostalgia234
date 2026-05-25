import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-3">
      <div className="font-display text-5xl text-ink-100">404</div>
      <p className="text-ink-400">этой страницы здесь нет</p>
      <Link href="/" className="inline-block text-sm text-ink-300 hover:text-ink-100 mt-3 underline-offset-4 hover:underline">
        ← домой
      </Link>
    </div>
  );
}
