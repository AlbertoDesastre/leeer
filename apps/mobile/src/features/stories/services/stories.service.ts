import { storyListSchema, type StoryDto } from "@leeer/contracts";
import { env } from "@/src/shared/config/env";

export async function listStories(): Promise<StoryDto[]> {
  const response = await fetch(`${env.EXPO_PUBLIC_API_URL}/api/v1/stories`);
  if (!response.ok) throw new Error("Could not load stories");
  return storyListSchema.parse(await response.json());
}
