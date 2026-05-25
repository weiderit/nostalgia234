"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, setPassword } from "@/lib/auth";
import { updateDB } from "@/lib/db";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const artistName = String(formData.get("artistName") || "").trim();
  const siteName = String(formData.get("siteName") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const about = String(formData.get("about") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const linksRaw = String(formData.get("links") || "");
  const links = linksRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...url] = line.split("|");
      return { label: label.trim(), url: url.join("|").trim() };
    })
    .filter((l) => l.label && l.url);

  await updateDB((db) => ({
    ...db,
    settings: {
      ...db.settings,
      artistName: artistName || db.settings.artistName,
      siteName: siteName || db.settings.siteName,
      tagline,
      about,
      location: location || undefined,
      links,
    },
  }));

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function changePasswordAction(formData: FormData) {
  await requireAdmin();
  const pwd = String(formData.get("password") || "");
  if (pwd.length < 4) {
    redirect("/admin/settings?pwerror=1");
  }
  await setPassword(pwd);
  redirect("/admin/settings?pwsaved=1");
}
