import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { TrackForm } from "@/components/admin/TrackForm";
import { updateTrackAction } from "../actions";

export default async function EditTrackPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await getDB();
  const track = db.tracks.find((t) => t.id === params.id);
  if (!track) return notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink-100">
          редактировать: {track.title}
        </h1>
      </div>
      <TrackForm action={updateTrackAction} track={track} />
    </div>
  );
}
