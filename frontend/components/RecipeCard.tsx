import { Recipe } from "@/types/types";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { NAVBAR_HEIGHT } from "./Navbar";

const { height: windowHeight } = Dimensions.get("window");
const CARD_HEIGHT = Math.max(0, windowHeight);

type Props = {
  recipe: Recipe;
};

const RecipeCard: React.FC<Props> = ({ recipe }: Props) => {
  const imageUrl =
    recipe.coverImageURL ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

  const bottomOffset = NAVBAR_HEIGHT + 16;

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      resizeMode="cover"
      className="w-full"
      style={{ height: CARD_HEIGHT }}
    >
      <View className="flex-1 justify-end bg-black/20 p-6">
        <Text className="text-white text-3xl font-bold mb-2">
          {recipe.title}
        </Text>
        <Text className="text-white text-base mb-2">{recipe.description}</Text>
        <Text
          className="text-white text-sm"
          style={{ marginBottom: bottomOffset }}
        >
          {recipe.difficulty} • {recipe.prepare_time} min
        </Text>
      </View>
    </ImageBackground>
  );
};

export default RecipeCard;
