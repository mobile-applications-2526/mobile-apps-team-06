import { View, Text, ImageBackground, useWindowDimensions } from "react-native";
import { Recipe } from "@/types/types";

type Props = {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }: Props) => {
  // Use hooks for dynamic dimensions
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  
  const imageUrl = recipe.coverImageURL || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
  
  return (
    <View style={{ height: windowHeight, width: windowWidth }}>
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-end bg-black/20 p-6 pb-24">
          <Text className="text-white text-3xl font-bold">
            {recipe.title}
          </Text>
          <Text className="text-white text-base mt-2">
            {recipe.description}
          </Text>
          <Text className="text-white text-sm mt-1">
            {recipe.difficulty} • {recipe.prepare_time} min
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RecipeCard;