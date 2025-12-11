import { RecipeService } from "@/services/RecipeService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function RecipeOverview() {
  const recipeService = RecipeService;
  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    recipeService.getRecipeById(id.toString()).then(setRecipe);
  }, [id]);

  return (
    <View className="bg-green-500">
      <Text>Recipe ID: {id}</Text>
    </View>
  );
}
