import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-3 animate-fade-in">
      <div className="text-6xl">🌵</div>
      <div className="font-display text-5xl text-cactus-900">404</div>
      <p className="text-cactus-700/80">страничка, видимо, ушла поливаться</p>
      <Link
        href="/"
        className="inline-block text-sm text-cactus-600 hover:text-cactus-800 mt-3 underline-offset-4 hover:underline"
      >
        ← на главную
      </Link>
    </div>
  );
}
