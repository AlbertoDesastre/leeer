import type { StoryDto } from "@leeer/contracts";
import { Text, View } from "react-native";
export function StoryCard({ story }: { story: StoryDto }) { return <View className="rounded-2xl border border-stone-300 bg-white p-5"><Text className="text-lg font-semibold">{story.title}</Text></View>; }
