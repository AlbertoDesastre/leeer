import { z } from "zod";

export const storyDtoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(160),
  createdAt: z.string().datetime(),
});

export const createStoryInputDtoSchema = z.object({
  title: z.string().trim().min(1).max(160),
});

export const storyListDtoSchema = z.array(storyDtoSchema);

export type StoryDto = z.infer<typeof storyDtoSchema>;
export type CreateStoryInputDto = z.infer<typeof createStoryInputDtoSchema>;
