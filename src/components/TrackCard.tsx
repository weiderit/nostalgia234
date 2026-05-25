"use client";

import Link from "next/link";
import { Cover } from "./Cover";
import { StatusPill } from "./TrackRow";
import { PlayButton } from "./PlayButton";
import { toPlayable } from "@/lib/playable";
import type { Track } from "@/lib/types";

export function TrackCard({
  track,
  queue,
}: {
  track: Track;
  queue?: Track[];
}) {
  return (
    <div className="group relative">
      <Link
        href={`/track/${track.id}`}
        className="block rounded-xl overflow-hidden bg-ink-850 hover:bg-ink-800 transition-colors"
      >
        <div className="aspect-square relative">
          <Cover src={track.cover} title={track.title} rounded="none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm text-ink-100 truncate">{track.title}</div>
            <StatusPill status={track.status} />
          </div>
          <div className="text-xs text-ink-400 mt-1 truncate">
            {[track.genre, track.mood].filter(Boolean).join(" · ") || " "}
          </div>
        </div>
      </Link>
      <div
        className="absolute right-3 top-[68%] -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <PlayButton
          track={toPlayable(track)}
          queue={(queue || [track]).map(toPlayable)}
          size="md"
        />
      </div>
    </div>
  );
}
