import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <View className="flex-1 justify-center gap-6 px-6">
        <Text className="text-sm font-bold uppercase tracking-widest text-red-800">leeer</Text>
        <Text className="text-4xl font-bold text-stone-900">Escribe donde te encuentre la historia.</Text>
        <Text className="text-base leading-6 text-stone-600">Landing mínima de la app móvil, preparada por feature.</Text>
        <Link href="/stories" className="rounded-2xl bg-stone-900 px-5 py-4 text-center font-semibold text-white">Ver historias</Link>
      </View>
    </SafeAreaView>
  );
}
