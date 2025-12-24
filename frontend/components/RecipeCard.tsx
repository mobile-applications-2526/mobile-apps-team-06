import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Recipe } from "@/types/types";
import { Heart, ChevronRight, ArrowBigDown } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

type Props = {
  recipe: Recipe;
};

const RecipeCard: React.FC<Props> = ({ recipe }: Props) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const imageUrl =
    recipe.coverImageURL ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

  return (
    <View style={{ height: windowHeight, width: windowWidth }}>
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {/* Tags section upper part */}
        <View className="px-4 pt-24">
          <View className="flex-row flex-wrap gap-2">
            <View className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/30">
              <Text className="text-white text-xs font-medium">
                {recipe.prepare_time} min
              </Text>
            </View>
            <View className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/30">
              <Text className="text-white text-xs font-medium">
                {recipe.difficulty}
              </Text>
            </View>
            {/* sliced them up so we have individual boxes */}
            {recipe.tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/30"
              >
                <Text className="text-white text-xs font-medium">{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* the gradient thingy for background */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
          locations={[0, 0.5, 1]}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          {/* SFL button */}
          <View className="items-end mb-4 pr-2">
            <View className="items-center">
              <TouchableOpacity
                onPress={() => router.push(`/recipe/${recipe.id.id}`)}
                className="bg-white rounded-full p-3 mb-2 "
              >
                <ChevronRight size={24} color="#000" />
              </TouchableOpacity>
              <Text className="text-white text-xs font-medium">
                See full recipe
              </Text>
            </View>
          </View>

          {/* Bottom stuff */}
          <View style={{ paddingBottom: insets.bottom + 84 }} className="px-6">
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-1 pr-4">
                <Text className="text-white text-4xl font-bold leading-tight">
                  {recipe.title}
                </Text>
              </View>
              {/* like heart */}
              <TouchableOpacity className="mt-2">
                <Heart size={32} color="#fff" fill="#fff" />
              </TouchableOpacity>
            </View>

            <Text className="text-white/90 text-base leading-relaxed mb-3">
              {recipe.description}
            </Text>

            <View className="border-t border-white/20 pt-3 items-center">
              <Text className="text-white/70 text-sm ">
                Swipe up for more recipes
              </Text>
              {/* Don't think looks good */}
              {/* <ArrowBigDown size={24} color={'#fff'} fill={'#fff'}/> */}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default RecipeCard;
