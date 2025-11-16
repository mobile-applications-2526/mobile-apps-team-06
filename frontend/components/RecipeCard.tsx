import { View, Text, ImageBackground, Dimensions } from "react-native";
import { NAVBAR_HEIGHT } from "./Navbar";

const { height: windowHeight } = Dimensions.get("window");
const CARD_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

const RecipeCard = ({ recipe }) => (
  <ImageBackground
    source={{ uri: recipe.image }}
    resizeMode="cover"
    className="w-full"
    style={{ height: CARD_HEIGHT }}
  >
    <View className="flex-1 justify-end bg-black/20 p-6">
      <Text className="text-white text-3xl font-bold mb-2">
        {recipe.title}
      </Text>
      <Text className="text-white mb-8">Swipe up for more recipes</Text>
    </View>
  </ImageBackground>
);

export default RecipeCard;