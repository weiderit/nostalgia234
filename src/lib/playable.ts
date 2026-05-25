import type { Track } from "./types";

export interface PlayableTrack {
  id: string;
  title: string;
  artist?: string;
  cover?: string;
  audio?: string;
  href?: string;
  status?: string;
}

const STATUS_LABEL: Record<Track["status"], string> = {
  release: "релиз",
  demo: "демо",
  archive: "архив",
  coming: "скоро",
};

export function toPlayable(t: Track): PlayableTrack {
  return {
    id: t.id,
    title: t.title,
    cover: t.cover,
    audio: t.audio,
    href: `/track/${t.id}`,
    status: STATUS_LABEL[t.status] || t.status,
  };
}
