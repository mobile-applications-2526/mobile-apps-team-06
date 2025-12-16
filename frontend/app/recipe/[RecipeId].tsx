import { RecipeService } from "@/services/RecipeService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {Recipe} from "@/types/types";

export default function RecipeOverview() {
  const { RecipeId } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<Recipe>();

  const fetchRecipe = async (recipeId: string) => {
    if (!recipeId) {
      return;
    }
    const response = await RecipeService.getRecipeById(recipeId.toString());

    setRecipe(response.json);
  }

  useEffect(() => {
    fetchRecipe(RecipeId as string);
  }, []);

  return (
    <View className="bg-green-500">
      <Text>Recipe ID: {RecipeId}</Text>
    </View>

  );
}
