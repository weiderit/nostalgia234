"use client";

import Link from "next/link";
import clsx from "clsx";
import { Cover } from "./Cover";
import { usePlayer } from "./PlayerProvider";
import { toPlayable } from "@/lib/playable";
import type { Track } from "@/lib/types";

export function TrackRow({
  track,
  index,
  queue,
}: {
  track: Track;
  index?: number;
  queue?: Track[];
}) {
  const { play, current, isPlaying, toggle } = usePlayer();
  const isCurrent = current?.id === track.id;
  const playable = toPlayable(track);
  const list = (queue || [track]).map(toPlayable);

  const handlePlay = () => {
    if (isCurrent) {
      toggle();
    } else if (track.audio) {
      play(playable, list);
    } else {
      play(playable, list);
    }
  };

  return (
    <div
      className={clsx(
        "group grid grid-cols-[24px_auto_1fr_auto_auto] md:grid-cols-[28px_48px_1fr_140px_60px] items-center gap-3 md:gap-4 px-2 md:px-3 py-2 rounded-md hover:bg-ink-850 transition-colors",
        isCurrent && "bg-ink-850",
      )}
    >
      <button
        onClick={handlePlay}
        className="text-ink-500 hover:text-ink-100 w-6 h-6 flex items-center justify-center text-sm tabular-nums"
        aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
      >
        {isCurrent && isPlaying ? (
          <span className="eq text-ink-100">
            <span />
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            <span className="group-hover:hidden">
              {index !== undefined ? index + 1 : "•"}
            </span>
            <svg
              className="hidden group-hover:block"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </>
        )}
      </button>
      <div className="hidden md:block w-12 h-12 rounded overflow-hidden shrink-0">
        <Cover src={track.cover} title={track.title} />
      </div>
      <div className="min-w-0">
        <Link
          href={`/track/${track.id}`}
          className={clsx(
            "block text-sm truncate hover:underline",
            isCurrent ? "text-ink-100" : "text-ink-100",
          )}
        >
          {track.title}
        </Link>
        <div className="text-xs text-ink-400 truncate">
          {[track.genre, track.mood].filter(Boolean).join(" · ") || "Ibraim"}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-[11px] text-ink-400">
        <StatusPill status={track.status} />
        {track.releaseDate && (
          <span className="text-ink-500">{formatDate(track.releaseDate)}</span>
        )}
      </div>
      <div className="text-[11px] text-ink-500 text-right">
        {track.favorite ? "♥" : ""}
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: Track["status"] }) {
  const map = {
    release: { label: "релиз", cls: "text-ink-100 border-ink-600" },
    demo: { label: "демо", cls: "text-accent-warm border-accent-warm/40" },
    archive: { label: "архив", cls: "text-ink-400 border-ink-700" },
    coming: { label: "скоро", cls: "text-ink-100 border-ink-100/40" },
  } as const;
  const it = map[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-[0.16em]",
        it.cls,
      )}
    >
      {it.label}
    </span>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
