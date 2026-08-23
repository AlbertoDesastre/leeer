import type { StoryDto } from "@leeer/contracts";

export function StoryCard({ story }: { story: StoryDto }) {
  return <article className="rounded-2xl border border-stone-300 bg-white p-5"><h2 className="font-semibold">{story.title}</h2><p className="mt-2 text-sm text-stone-500">Creada {new Date(story.createdAt).toLocaleDateString("es-ES")}</p></article>;
}
