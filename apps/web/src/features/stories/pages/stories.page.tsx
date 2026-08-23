import Link from "next/link";
import { listStories } from "../services/stories.service";
import { StoryCard } from "../components/story-card";

export async function StoriesPage() {
  const stories = await listStories().catch(() => []);
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link className="text-sm underline" href="/">← Inicio</Link>
      <h1 className="mt-8 text-4xl font-semibold">Historias</h1>
      <p className="mt-2 text-stone-600">Ruta de ejemplo consumiendo la API Express.</p>
      <div className="mt-8 grid gap-4">{stories.length ? stories.map((story) => <StoryCard key={story.id} story={story} />) : <p className="rounded-2xl border border-dashed border-stone-400 p-6">API sin datos o no iniciada.</p>}</div>
    </main>
  );
}
