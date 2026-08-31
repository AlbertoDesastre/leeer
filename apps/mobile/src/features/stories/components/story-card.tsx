import type { StoryDto } from "../dtos/story.dto";
import { Text, View } from "react-native";

export function StoryCard({ story }: { story: StoryDto }) {
  return (
    <View className="rounded-lg border border-border bg-card p-5">
      <Text className="text-lg font-semibold text-card-foreground">{story.title}</Text>
    </View>
  );
}
