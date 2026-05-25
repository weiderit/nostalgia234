"use client";

import { usePlayer } from "./PlayerProvider";
import { Cover } from "./Cover";
import Link from "next/link";
import clsx from "clsx";

function fmt(t: number) {
  if (!isFinite(t) || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Player() {
  const {
    current,
    isPlaying,
    toggle,
    next,
    prev,
    seek,
    duration,
    currentTime,
    volume,
    setVolume,
  } = usePlayer();

  const empty = !current;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink-800 bg-ink-900/95 backdrop-blur supports-[backdrop-filter]:bg-ink-900/80">
      <div className="px-4 md:px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3 min-w-0 w-1/3">
          {empty ? (
            <div className="flex items-center gap-3 text-ink-500">
              <div className="w-12 h-12 rounded-md cover-placeholder" />
              <div className="text-xs">
                <div>тишина</div>
                <div className="text-ink-600">выбери трек слева</div>
              </div>
            </div>
          ) : (
            <>
              <div className={clsx("w-12 h-12 rounded-md overflow-hidden shrink-0")}>
                <Cover src={current.cover} title={current.title} />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-ink-100 truncate">
                  {current.href ? (
                    <Link href={current.href} className="hover:underline">
                      {current.title}
                    </Link>
                  ) : (
                    current.title
                  )}
                </div>
                <div className="text-xs text-ink-400 truncate">
                  {current.artist || "Ibraim"}
                  {current.status ? ` · ${current.status}` : ""}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 text-ink-300">
            <button
              onClick={prev}
              className="p-2 hover:text-ink-100 transition disabled:opacity-30"
              disabled={empty}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h2v14H6zM20 5v14L9 12z" />
              </svg>
            </button>
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full bg-ink-100 text-ink-950 flex items-center justify-center hover:scale-105 transition disabled:opacity-30"
              disabled={empty}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={next}
              className="p-2 hover:text-ink-100 transition disabled:opacity-30"
              disabled={empty}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 w-full max-w-xl">
            <span className="text-[10px] tabular-nums text-ink-500 w-9 text-right">
              {fmt(currentTime)}
            </span>
            <input
              type="range"
              className="slider flex-1"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => seek(parseFloat(e.target.value))}
              disabled={empty}
            />
            <span className="text-[10px] tabular-nums text-ink-500 w-9">
              {fmt(duration)}
            </span>
          </div>
        </div>

        <div className="hidden md:flex w-1/3 justify-end items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink-400">
            <path d="M4 10v4h4l5 4V6L8 10H4z" />
          </svg>
          <input
            type="range"
            className="slider w-24"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
