import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center gap-6 px-6">
        <Text className="text-sm font-bold uppercase tracking-widest text-primary">leeer</Text>
        <Text className="font-serif text-4xl font-bold text-foreground">Escribe donde te encuentre la historia.</Text>
        <Text className="text-base leading-6 text-muted-foreground">Landing mínima de la app móvil, preparada por feature.</Text>
        <Link
          href="/stories"
          className="min-h-12 rounded-md bg-primary px-5 py-4 text-center font-semibold text-primary-foreground"
        >
          Ver historias
        </Link>
      </View>
    </SafeAreaView>
  );
}
