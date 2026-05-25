import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import type { DB, Post, Track } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let writeLock: Promise<void> = Promise.resolve();

function ensureDataDir() {
  if (!fssync.existsSync(DATA_DIR)) {
    fssync.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function newId(): string {
  return crypto.randomBytes(8).toString("hex");
}

function seed(): DB {
  const now = new Date().toISOString();
  const defaultPasswordHash = bcrypt.hashSync(
    process.env.ADMIN_PASSWORD || "ibraim",
    10,
  );
  const tracks: Track[] = [
    {
      id: "t-nostalgia",
      title: "Nostalgia 234",
      description:
        "Главная вещь альбома — медленный пульс, тёплое сатурированное пианино и шум плёнки.",
      note: "Делал её ночью у окна. Хотел, чтобы звучало как старая кассета, найденная в коробке родителей.",
      genre: "lo-fi / ambient",
      mood: "тёплая ностальгия",
      status: "release",
      releaseDate: "2026-04-12",
      favorite: true,
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-late-night",
      title: "Late Night Window",
      description: "Бит, который писал в 4 утра, не выключая дождь за окном.",
      note: "Сэмпл — старая запись с диктофона из 2019.",
      genre: "lo-fi",
      mood: "тихо",
      status: "release",
      releaseDate: "2026-02-02",
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-room-tone",
      title: "Room Tone",
      description: "Полу-инструменталка из сессий зимы.",
      note: "",
      genre: "instrumental",
      mood: "созерцание",
      status: "release",
      releaseDate: "2025-12-19",
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-demo-1",
      title: "untitled.demo.01",
      description: "Сырой набросок. Возможно станет треком.",
      note: "Записывал на телефон в метро, дома доделал петлю.",
      genre: "demo",
      mood: "rough",
      status: "demo",
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-demo-2",
      title: "voice memo / 03:14",
      description: "Гитарный набросок без названия.",
      note: "",
      genre: "demo",
      mood: "идея",
      status: "demo",
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-archive-1",
      title: "old beat (2019)",
      description: "Один из самых первых битов. Оставляю для истории.",
      note: "Я бы сейчас всё переделал, но пусть будет.",
      genre: "boom bap",
      mood: "архив",
      status: "archive",
      releaseDate: "2019-06-01",
      attachments: [],
      createdAt: now,
    },
    {
      id: "t-coming-1",
      title: "TBA — winter EP",
      description: "Готовлю мини-альбом на зиму. Скоро.",
      note: "Пять треков, один скит, обложка уже есть.",
      genre: "tba",
      mood: "?",
      status: "coming",
      attachments: [],
      createdAt: now,
    },
  ];

  const posts: Post[] = [
    {
      id: "p-welcome",
      title: "Это мой архив",
      kind: "note",
      body:
        "Сделал отдельное место для всей моей музыки — релизов, демок, мыслей и того, что обычно не выходит наружу. Не Spotify, не соц-сети, просто моя комната.",
      media: [],
      createdAt: now,
    },
    {
      id: "p-studio-1",
      title: "В студии: партия пианино для Nostalgia",
      kind: "video",
      body:
        "Короткое видео из ночной сессии. Микрофон ловил даже соседский кондиционер — оставил как есть.",
      media: [],
      createdAt: now,
    },
    {
      id: "p-snippet-1",
      title: "Сниппет нового трека",
      kind: "snippet",
      body: "20 секунд из того, над чем сижу. Текст пока меняю каждые два дня.",
      media: [],
      createdAt: now,
    },
    {
      id: "p-news-1",
      title: "Скоро — winter EP",
      kind: "news",
      body:
        "Пять треков. Без фитов. Релиз планирую до конца зимы. Обложка уже снята на пленку.",
      media: [],
      createdAt: now,
    },
  ];

  return {
    tracks,
    posts,
    settings: {
      artistName: "Ibraim",
      siteName: "Ibraim Library",
      tagline:
        "Архив моей музыки: релизы, демки, заметки и то, что не дойдёт до площадок.",
      about:
        "Я Ibraim — делаю медленную, ламповую музыку. Этот сайт — моё личное место, где можно слушать треки, заглядывать в демки и читать что я думаю про процесс. Здесь нет рекламы, нет рекомендаций, только то, что я сам решил показать.",
      location: "ночью у окна",
      links: [
        { label: "soundcloud", url: "https://soundcloud.com" },
        { label: "instagram", url: "https://instagram.com" },
        { label: "email", url: "mailto:hi@example.com" },
      ],
    },
    auth: { passwordHash: defaultPasswordHash },
  };
}

async function load(): Promise<DB> {
  ensureDataDir();
  if (!fssync.existsSync(DB_FILE)) {
    const data = seed();
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    return data;
  }
  const raw = await fs.readFile(DB_FILE, "utf8");
  try {
    return JSON.parse(raw) as DB;
  } catch {
    const data = seed();
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    return data;
  }
}

async function save(data: DB): Promise<void> {
  ensureDataDir();
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getDB(): Promise<DB> {
  return load();
}

export async function updateDB(
  mutator: (db: DB) => DB | Promise<DB>,
): Promise<DB> {
  const next = writeLock.then(async () => {
    const db = await load();
    const updated = await mutator(db);
    await save(updated);
    return updated;
  });
  writeLock = next.then(() => undefined).catch(() => undefined);
  return next;
}
