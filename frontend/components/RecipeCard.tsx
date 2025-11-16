import { View, Text, ImageBackground, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

const RecipeCard = ({ recipe }) => (
  <ImageBackground
    source={{ uri: recipe.image }}
    resizeMode="cover"
    className="w-full"
    style={{ height }}
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