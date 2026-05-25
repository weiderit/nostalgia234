export function formatDate(iso?: string, locale = "ru-RU"): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function relativeDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "только что";
  if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} д назад`;
  return formatDate(iso);
}

export function latestRelease<T extends { releaseDate?: string; createdAt: string }>(
  items: T[],
): T | undefined {
  const released = items.filter((i) => i.releaseDate);
  if (released.length === 0) return items[0];
  return [...released].sort((a, b) => {
    return (
      new Date(b.releaseDate!).getTime() - new Date(a.releaseDate!).getTime()
    );
  })[0];
}
