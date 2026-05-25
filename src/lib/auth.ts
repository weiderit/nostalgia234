import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getDB, updateDB } from "./db";

const COOKIE_NAME = "ibr_session";
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ||
    "this-is-a-local-only-secret-change-me-please-32chars",
);

export async function signSession(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySession(token);
}

export async function loginWithPassword(password: string): Promise<boolean> {
  const db = await getDB();
  if (!db.auth.passwordHash) return false;
  const ok = await bcrypt.compare(password, db.auth.passwordHash);
  if (!ok) return false;
  const token = await signSession();
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
}

export async function setPassword(newPassword: string): Promise<void> {
  const hash = await bcrypt.hash(newPassword, 10);
  await updateDB((db) => ({ ...db, auth: { passwordHash: hash } }));
}
