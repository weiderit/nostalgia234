export type TrackStatus = "release" | "demo" | "archive" | "coming";

export interface TrackAttachment {
  id: string;
  kind: "video" | "demo" | "image" | "link";
  url: string;
  title?: string;
  note?: string;
}

export interface Track {
  id: string;
  title: string;
  cover?: string;
  audio?: string;
  description?: string;
  note?: string;
  lyrics?: string;
  genre?: string;
  mood?: string;
  status: TrackStatus;
  releaseDate?: string;
  favorite?: boolean;
  attachments: TrackAttachment[];
  createdAt: string;
}

export type PostKind =
  | "text"
  | "video"
  | "demo"
  | "snippet"
  | "news"
  | "note";

export interface PostMedia {
  id: string;
  kind: "image" | "video" | "audio";
  url: string;
  caption?: string;
}

export interface Post {
  id: string;
  title: string;
  body?: string;
  kind: PostKind;
  media: PostMedia[];
  createdAt: string;
}

export interface SiteSettings {
  artistName: string;
  siteName: string;
  tagline: string;
  about: string;
  location?: string;
  links: { label: string; url: string }[];
}

export interface DB {
  tracks: Track[];
  posts: Post[];
  settings: SiteSettings;
  auth: {
    passwordHash: string | null;
  };
}
