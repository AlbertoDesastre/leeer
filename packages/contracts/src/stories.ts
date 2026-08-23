import { z } from "zod";

export const storySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(160),
  createdAt: z.string().datetime(),
});

export const createStoryInputSchema = z.object({
  title: z.string().trim().min(1).max(160),
});

export const storyListSchema = z.array(storySchema);

export type StoryDto = z.infer<typeof storySchema>;
export type CreateStoryInput = z.infer<typeof createStoryInputSchema>;
