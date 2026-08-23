import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryCard } from "../components/story-card";
import { useStories } from "../hooks/use-stories";

export function StoriesPage() {
  const { stories, loading } = useStories();
  return <SafeAreaView className="flex-1 bg-stone-100"><View className="gap-4 p-6"><Text className="text-3xl font-bold">Historias</Text>{loading ? <Text>Cargando…</Text> : stories.length ? stories.map((story) => <StoryCard key={story.id} story={story} />) : <Text>API sin datos o no iniciada.</Text>}</View></SafeAreaView>;
}
