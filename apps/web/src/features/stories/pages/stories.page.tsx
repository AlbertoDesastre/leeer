import Link from "next/link";
import { listStories } from "../services/stories.service";
import { StoryCard } from "../components/story-card";

export async function StoriesPage() {
  const stories = await listStories().catch(() => []);
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        className="text-sm text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        href="/"
      >
        ← Inicio
      </Link>
      <h1 className="mt-8 font-serif text-4xl font-semibold">Historias</h1>
      <p className="mt-2 text-muted-foreground">Ruta de ejemplo consumiendo la API Express.</p>
      <div className="mt-8 grid gap-4">
        {stories.length ? (
          stories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">API sin datos o no iniciada.</p>
        )}
      </div>
    </main>
  );
}
