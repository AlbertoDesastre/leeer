import type { StoryDto } from "../dtos/story.dto";

export function StoryCard({ story }: { story: StoryDto }) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
      <h2 className="font-semibold">{story.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Creada {new Date(story.createdAt).toLocaleDateString("es-ES")}</p>
    </article>
  );
}
