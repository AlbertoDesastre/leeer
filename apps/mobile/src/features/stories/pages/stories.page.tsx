import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryCard } from "../components/story-card";
import { useStories } from "../hooks/use-stories";

export function StoriesPage() {
  const { stories, loading } = useStories();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="gap-4 p-6">
        <Text className="font-serif text-3xl font-bold text-foreground">Historias</Text>
        {loading ? (
          <Text className="text-muted-foreground">Cargando…</Text>
        ) : stories.length ? (
          stories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <Text className="text-muted-foreground">API sin datos o no iniciada.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
