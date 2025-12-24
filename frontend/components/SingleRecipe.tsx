import { ScrollView, View, TouchableOpacity, Text, Image } from "react-native";
import { NAVBAR_HEIGHT } from "./Navbar";
import { Recipe } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, CookingPot, ChefHat, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";

type Props = {
  recipe: Recipe;
};

const SingleRecipe: React.FC<Props> = ({ recipe }: Props) => {
  const router = useRouter();
  const creatorUsername = recipe.poster?.user?.username;

  return (
    <ScrollView
      className="flex-1 bg-black pb-24"
      contentContainerStyle={{ paddingBottom: NAVBAR_HEIGHT + 24 }}
    >
      {/* Header Image */}
      <View className="relative h-80 overflow-hidden">
        <Image
          source={{ uri: recipe.coverImageURL }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-6 bg-black/50 p-3 rounded-full z-10"
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Title Overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-6">
          <Text className="text-4xl font-bold text-white mb-2">
            {recipe.title}
          </Text>
          <Text className="text-white/80">{recipe.description}</Text>
        </View>
      </View>

      {/* Creator*/}
      <View className="px-6 pt-5 flex-row items-center gap-2">
        <Text className="text-white/60">Made by</Text>
        <TouchableOpacity
          onPress={() => {
            if (!creatorUsername) return;
            router.push({
              pathname: "/account/[username]",
              params: { username: String(creatorUsername) },
            });
          }}
        >
          <Text className="text-white font-medium underline">
            {creatorUsername}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Meta Info */}
      <View className="px-6 py-6 flex-row flex-wrap justify-between gap-4">
        <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
          <CookingPot size={20} color="rgba(255,255,255,0.6)" />
          <Text className="text-white/60 text-sm">Prep Time</Text>
          <Text className="text-white">{recipe.prepare_time} min</Text>
        </View>
        <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
          <ChefHat size={20} color="rgba(255,255,255,0.6)" />
          <Text className="text-white/60 text-sm">Difficulty</Text>
          <Text className="text-white">{recipe.difficulty}</Text>
        </View>
        <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
          <Heart size={20} color="rgba(255,255,255,0.6)" />
          <Text className="text-white/60 text-sm">Favorites</Text>
          <Text className="text-white">{recipe.favorites.length}</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <View className="px-6 py-4">
        <Text className="text-2xl text-white mb-4">Ingredients</Text>
        <View className="bg-white/5 rounded-2xl p-6 space-y-3">
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <View className="w-2 h-2 rounded-full bg-white/60" />
              <Text className="text-white/90">{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Steps Section */}
      <View className="px-6 py-4">
        <Text className="text-2xl text-white mb-4">Steps</Text>
        <View className="space-y-4">
          {recipe.steps.map((step, index) => (
            <View key={index} className="flex-row gap-4 p-2 items-center">
              <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Text className="text-black">{index + 1}</Text>
              </View>
              <View className="bg-white/10 rounded-xl p-3 flex-1">
                <Text className="text-white/90">{step}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleRecipe;
