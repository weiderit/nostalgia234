"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { newId, updateDB } from "@/lib/db";
import { saveUpload } from "@/lib/uploads";
import type { Post, PostKind, PostMedia } from "@/lib/types";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function asKind(v: FormDataEntryValue | null): PostKind {
  const s = String(v || "text");
  if (
    s === "text" ||
    s === "video" ||
    s === "demo" ||
    s === "snippet" ||
    s === "news" ||
    s === "note"
  ) {
    return s;
  }
  return "text";
}

function detectKind(filename: string): PostMedia["kind"] {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["mp4", "mov", "webm", "m4v"].includes(ext)) return "video";
  if (["mp3", "wav", "m4a", "ogg", "flac"].includes(ext)) return "audio";
  return "image";
}

async function collectMedia(formData: FormData): Promise<PostMedia[]> {
  const files = formData.getAll("media");
  const out: PostMedia[] = [];
  for (const f of files) {
    if (f instanceof File && f.size > 0) {
      const url = await saveUpload(f, "media");
      out.push({ id: newId(), kind: detectKind(f.name), url });
    }
  }
  return out;
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const kind = asKind(formData.get("kind"));
  const body = String(formData.get("body") || "").trim();
  const media = await collectMedia(formData);
  const post: Post = {
    id: newId(),
    title,
    kind,
    body: body || undefined,
    media,
    createdAt: new Date().toISOString(),
  };
  await updateDB((db) => ({ ...db, posts: [post, ...db.posts] }));
  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const title = String(formData.get("title") || "").trim();
  const kind = asKind(formData.get("kind"));
  const body = String(formData.get("body") || "").trim();
  const newMedia = await collectMedia(formData);

  await updateDB((db) => ({
    ...db,
    posts: db.posts.map((p) =>
      p.id === id
        ? {
            ...p,
            title: title || p.title,
            kind,
            body: body || undefined,
            media: [...p.media, ...newMedia],
          }
        : p,
    ),
  }));
  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath(`/post/${id}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await updateDB((db) => ({
    ...db,
    posts: db.posts.filter((p) => p.id !== id),
  }));
  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath("/admin/posts");
}

export async function removeMediaAction(formData: FormData) {
  await requireAdmin();
  const postId = String(formData.get("postId") || "");
  const mediaId = String(formData.get("mediaId") || "");
  await updateDB((db) => ({
    ...db,
    posts: db.posts.map((p) =>
      p.id === postId
        ? { ...p, media: p.media.filter((m) => m.id !== mediaId) }
        : p,
    ),
  }));
  revalidatePath(`/admin/posts/${postId}`);
  revalidatePath(`/post/${postId}`);
}
