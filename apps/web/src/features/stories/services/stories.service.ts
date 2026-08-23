import { storyListSchema, type StoryDto } from "@leeer/contracts";
import { env } from "@/src/shared/config/env";

export async function listStories(): Promise<StoryDto[]> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/stories`, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load stories");
  return storyListSchema.parse(await response.json());
}
