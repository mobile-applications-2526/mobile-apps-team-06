import {ImageBackground, Dimensions, ScrollView, View, TouchableOpacity, Text, Image} from "react-native";
import { NAVBAR_HEIGHT } from "./Navbar";
import { Recipe } from "@/types/types";
import {LinearGradient} from "expo-linear-gradient";
import {Feather} from "lucide-react-native";

const { height: windowHeight } = Dimensions.get("window");
const CARD_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

type Props = {
  recipe: Recipe
}

const SingleRecipe: React.FC<Props> = ({recipe}: Props) => {
  return (
      <ScrollView className="flex-1 bg-black pb-24">
        {/* Header Image */}
        <View className="relative h-80 overflow-hidden">
          <Image
              source={{ uri: recipe.coverImageURL }}
              className="w-full h-full"
              resizeMode="cover"
          />
          <LinearGradient
              colors={['black', 'rgba(0,0,0,0.5)', 'transparent']}
              className="absolute inset-0"
          />

          {/* Back Button */}
          <TouchableOpacity
              onPress={onBack}
              className="absolute top-6 left-6 bg-black/50 p-3 rounded-full z-10"
          >
            {/*<Feather name="arrow-left" size={24} color="white" />*/}
          </TouchableOpacity>

          {/* Title Overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-6">
            <Text className="text-4xl font-bold text-white mb-2">{recipe.title}</Text>
            <Text className="text-white/80">{recipe.description}</Text>
          </View>
        </View>

        {/* Meta Info */}
        <View className="px-6 py-6 flex-row flex-wrap justify-between gap-4">
          <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
            {/*<Feather size={20} color="rgba(255,255,255,0.6)" />*/}
            <Text className="text-white/60 text-sm">Prep Time</Text>
            <Text className="text-white">{recipe.prepare_time} min</Text>
          </View>
          <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
            {/*<MaterialCommunityIcons name="chef-hat" size={20} color="rgba(255,255,255,0.6)" />*/}
            <Text className="text-white/60 text-sm">Difficulty</Text>
            <Text className="text-white">{recipe.difficulty}</Text>
          </View>
          <View className="bg-white/5 rounded-xl p-4 flex items-center gap-2">
            {/*<Feather name="users" size={20} color="rgba(255,255,255,0.6)" />*/}
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
                <View key={index} className="flex-row gap-4">
                  <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Text className="text-black">{index + 1}</Text>
                  </View>
                  <View className="bg-white/5 rounded-xl p-4 flex-1">
                    <Text className="text-white/90">{step}</Text>
                  </View>
                </View>
            ))}
          </View>
        </View>
      </ScrollView>
  );};
export default SingleRecipe;