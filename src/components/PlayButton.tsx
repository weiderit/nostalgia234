"use client";

import clsx from "clsx";
import { usePlayer, type PlayableTrack } from "./PlayerProvider";

export function PlayButton({
  track,
  queue,
  size = "lg",
  label,
}: {
  track: PlayableTrack;
  queue?: PlayableTrack[];
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const { play, current, isPlaying, toggle } = usePlayer();
  const isCurrent = current?.id === track.id;
  const playing = isCurrent && isPlaying;

  const dim = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  }[size];

  return (
    <button
      onClick={() => {
        if (isCurrent) toggle();
        else play(track, queue || [track]);
      }}
      className={clsx(
        "inline-flex items-center gap-3 rounded-full bg-ink-100 text-ink-950 hover:scale-[1.03] active:scale-100 transition shadow-lg shadow-black/40",
        label ? "pl-2 pr-5" : "px-0",
      )}
      aria-label={playing ? "Pause" : "Play"}
    >
      <span
        className={clsx(
          "inline-flex items-center justify-center rounded-full bg-ink-100",
          dim,
        )}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </span>
      {label && (
        <span className="text-sm font-medium tracking-wide">
          {playing ? "Pause" : label}
        </span>
      )}
    </button>
  );
}
