"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { newId, updateDB } from "@/lib/db";
import { saveUpload } from "@/lib/uploads";
import type { Track, TrackStatus } from "@/lib/types";

async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

function asStatus(v: FormDataEntryValue | null): TrackStatus {
  const s = String(v || "release");
  if (s === "release" || s === "demo" || s === "archive" || s === "coming") {
    return s;
  }
  return "release";
}

export async function createTrackAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  if (!title) return;

  const status = asStatus(formData.get("status"));
  const description = String(formData.get("description") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const lyrics = String(formData.get("lyrics") || "").trim();
  const genre = String(formData.get("genre") || "").trim();
  const mood = String(formData.get("mood") || "").trim();
  const releaseDate = String(formData.get("releaseDate") || "").trim();
  const favorite = formData.get("favorite") === "on";

  const audioFile = formData.get("audio");
  const coverFile = formData.get("cover");

  let audio: string | undefined;
  let cover: string | undefined;
  if (audioFile instanceof File && audioFile.size > 0) {
    audio = await saveUpload(audioFile, "audio");
  }
  if (coverFile instanceof File && coverFile.size > 0) {
    cover = await saveUpload(coverFile, "image");
  }

  const track: Track = {
    id: newId(),
    title,
    status,
    description: description || undefined,
    note: note || undefined,
    lyrics: lyrics || undefined,
    genre: genre || undefined,
    mood: mood || undefined,
    releaseDate: releaseDate || undefined,
    favorite,
    audio,
    cover,
    attachments: [],
    createdAt: new Date().toISOString(),
  };

  await updateDB((db) => ({ ...db, tracks: [track, ...db.tracks] }));

  revalidatePath("/");
  revalidatePath("/music");
  revalidatePath("/demos");
  revalidatePath("/admin/tracks");
  redirect("/admin/tracks");
}

export async function updateTrackAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const title = String(formData.get("title") || "").trim();
  const status = asStatus(formData.get("status"));
  const description = String(formData.get("description") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const lyrics = String(formData.get("lyrics") || "").trim();
  const genre = String(formData.get("genre") || "").trim();
  const mood = String(formData.get("mood") || "").trim();
  const releaseDate = String(formData.get("releaseDate") || "").trim();
  const favorite = formData.get("favorite") === "on";

  const audioFile = formData.get("audio");
  const coverFile = formData.get("cover");

  await updateDB(async (db) => {
    const tracks = await Promise.all(
      db.tracks.map(async (t) => {
        if (t.id !== id) return t;
        let audio = t.audio;
        let cover = t.cover;
        if (audioFile instanceof File && audioFile.size > 0) {
          audio = await saveUpload(audioFile, "audio");
        }
        if (coverFile instanceof File && coverFile.size > 0) {
          cover = await saveUpload(coverFile, "image");
        }
        return {
          ...t,
          title: title || t.title,
          status,
          description: description || undefined,
          note: note || undefined,
          lyrics: lyrics || undefined,
          genre: genre || undefined,
          mood: mood || undefined,
          releaseDate: releaseDate || undefined,
          favorite,
          audio,
          cover,
        };
      }),
    );
    return { ...db, tracks };
  });

  revalidatePath("/");
  revalidatePath("/music");
  revalidatePath("/demos");
  revalidatePath(`/track/${id}`);
  revalidatePath("/admin/tracks");
  redirect("/admin/tracks");
}

export async function deleteTrackAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await updateDB((db) => ({
    ...db,
    tracks: db.tracks.filter((t) => t.id !== id),
  }));
  revalidatePath("/");
  revalidatePath("/music");
  revalidatePath("/demos");
  revalidatePath("/admin/tracks");
}
