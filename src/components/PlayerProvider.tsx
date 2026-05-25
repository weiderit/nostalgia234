"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { PlayableTrack } from "@/lib/playable";
export type { PlayableTrack } from "@/lib/playable";

interface PlayerState {
  queue: PlayableTrack[];
  index: number;
  current: PlayableTrack | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  play: (track: PlayableTrack, queue?: PlayableTrack[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Ctx = createContext<PlayerState | null>(null);

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlayer outside provider");
  return v;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<PlayableTrack[]>([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.8);

  const current = queue[index] ?? null;

  const play = useCallback(
    (track: PlayableTrack, q?: PlayableTrack[]) => {
      const list = q && q.length > 0 ? q : [track];
      const idx = Math.max(
        0,
        list.findIndex((t) => t.id === track.id),
      );
      setQueue(list);
      setIndex(idx);
      setIsPlaying(true);
    },
    [],
  );

  const toggle = useCallback(() => {
    if (!current) return;
    setIsPlaying((p) => !p);
  }, [current]);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, queue.length - 1));
  }, [queue.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const seek = useCallback((time: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!current?.audio) {
      a.removeAttribute("src");
      a.load();
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);
      return;
    }
    if (a.src !== window.location.origin + current.audio && a.src !== current.audio) {
      a.src = current.audio;
      a.load();
    }
    if (isPlaying) {
      a.play().catch(() => setIsPlaying(false));
    } else {
      a.pause();
    }
  }, [current, isPlaying]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => {
      if (index < queue.length - 1) setIndex(index + 1);
      else setIsPlaying(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [index, queue.length]);

  const value = useMemo<PlayerState>(
    () => ({
      queue,
      index,
      current,
      isPlaying,
      duration,
      currentTime,
      volume,
      play,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      audioRef,
    }),
    [queue, index, current, isPlaying, duration, currentTime, volume, play, toggle, next, prev, seek, setVolume],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </Ctx.Provider>
  );
}
