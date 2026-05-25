import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { TrackForm } from "@/components/admin/TrackForm";
import { createTrackAction } from "../actions";

export default async function NewTrackPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink-100">новый трек</h1>
        <p className="text-sm text-ink-400 mt-1">
          релиз, демка, архив или что-то скоро — всё сюда
        </p>
      </div>
      <TrackForm action={createTrackAction} submitLabel="загрузить" />
    </div>
  );
}
