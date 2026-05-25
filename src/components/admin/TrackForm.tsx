import type { Track } from "@/lib/types";

export function TrackForm({
  action,
  track,
  submitLabel = "сохранить",
}: {
  action: (fd: FormData) => void | Promise<void>;
  track?: Track;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      {track?.id && <input type="hidden" name="id" value={track.id} />}

      <Field label="название" required>
        <input
          name="title"
          defaultValue={track?.title || ""}
          required
          className="input"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="статус">
          <select
            name="status"
            defaultValue={track?.status || "release"}
            className="input"
          >
            <option value="release">релиз</option>
            <option value="demo">демо</option>
            <option value="archive">архив</option>
            <option value="coming">скоро</option>
          </select>
        </Field>
        <Field label="дата релиза (опционально)">
          <input
            name="releaseDate"
            type="date"
            defaultValue={
              track?.releaseDate ? track.releaseDate.slice(0, 10) : ""
            }
            className="input"
          />
        </Field>
        <Field label="жанр">
          <input
            name="genre"
            defaultValue={track?.genre || ""}
            placeholder="lo-fi, ambient…"
            className="input"
          />
        </Field>
        <Field label="настроение">
          <input
            name="mood"
            defaultValue={track?.mood || ""}
            placeholder="ночь, дождь, тёплое"
            className="input"
          />
        </Field>
      </div>

      <Field label="описание (что это и для кого)">
        <textarea
          name="description"
          defaultValue={track?.description || ""}
          rows={3}
          className="input"
        />
      </Field>

      <Field label="личная заметка (видна на странице трека)">
        <textarea
          name="note"
          defaultValue={track?.note || ""}
          rows={3}
          className="input"
          placeholder="как делал, что хотел сказать, что слышишь сам"
        />
      </Field>

      <Field label="текст / lyrics (опционально)">
        <textarea
          name="lyrics"
          defaultValue={track?.lyrics || ""}
          rows={4}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={track?.audio ? "заменить аудио (mp3/wav)" : "аудио (mp3/wav)"}>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            className="input-file"
          />
          {track?.audio && (
            <div className="text-[11px] text-ink-500 mt-1">
              текущий: {track.audio}
            </div>
          )}
        </Field>
        <Field label={track?.cover ? "заменить обложку" : "обложка (jpg/png)"}>
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="input-file"
          />
          {track?.cover && (
            <div className="text-[11px] text-ink-500 mt-1">
              текущая: {track.cover}
            </div>
          )}
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-300">
        <input
          type="checkbox"
          name="favorite"
          defaultChecked={track?.favorite || false}
        />
        в подборку «любимое»
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-ink-100 text-ink-950 px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          {submitLabel}
        </button>
        <a
          href="/admin/tracks"
          className="text-sm text-ink-400 hover:text-ink-100"
        >
          отмена
        </a>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: #0a0a0b;
          border: 1px solid #23252a;
          border-radius: 6px;
          padding: 8px 12px;
          color: #ebecef;
          font-size: 14px;
          outline: none;
        }
        .input:focus { border-color: #494c55; }
        .input-file {
          width: 100%;
          background: transparent;
          color: #a8acb5;
          font-size: 13px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-1.5">
        {label}
        {required && <span className="text-accent-warm"> *</span>}
      </span>
      {children}
    </label>
  );
}
