import { useEffect, useState } from "react";
import type { StoryDto } from "@leeer/contracts";
import { listStories } from "../services/stories.service";

export function useStories() {
  const [stories, setStories] = useState<StoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { void listStories().then(setStories).finally(() => setLoading(false)); }, []);
  return { stories, loading };
}
