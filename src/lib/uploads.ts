import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function ensureDir() {
  if (!fssync.existsSync(UPLOAD_DIR)) {
    fssync.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function safeExt(name: string): string {
  const m = /\.([a-zA-Z0-9]{1,8})$/.exec(name);
  return m ? `.${m[1].toLowerCase()}` : "";
}

export async function saveUpload(
  file: File,
  hint: "audio" | "image" | "media" = "media",
): Promise<string> {
  ensureDir();
  const id = crypto.randomBytes(8).toString("hex");
  const ext = safeExt(file.name);
  const filename = `${hint}-${id}${ext}`;
  const target = path.join(UPLOAD_DIR, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(target, buf);
  return `/uploads/${filename}`;
}
