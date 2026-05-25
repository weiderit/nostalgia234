import clsx from "clsx";

function hashHue(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % 360;
}

export function Cover({
  src,
  title,
  className,
  rounded = "md",
}: {
  src?: string;
  title: string;
  className?: string;
  rounded?: "md" | "lg" | "xl" | "2xl" | "none";
}) {
  const r = {
    none: "rounded-none",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  }[rounded];

  if (src) {
    return (
      <img
        src={src}
        alt={title}
        className={clsx("w-full h-full object-cover", r, className)}
      />
    );
  }
  const hue = hashHue(title);
  const c1 = `hsl(${hue}, 22%, 18%)`;
  const c2 = `hsl(${(hue + 40) % 360}, 22%, 9%)`;
  const initials = title
    .replace(/[^a-zA-Zа-яА-Я0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={clsx(
        "w-full h-full flex items-center justify-center font-display text-ink-200/80 select-none",
        r,
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 80% at 30% 20%, ${c1}, ${c2})`,
      }}
    >
      <span className="text-lg md:text-2xl tracking-widest">{initials || "··"}</span>
    </div>
  );
}
