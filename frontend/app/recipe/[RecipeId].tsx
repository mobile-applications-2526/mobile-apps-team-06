import Navbar from "@/components/Navbar";
import SingleRecipe from "@/components/SingleRecipe";
import RecipeService from "@/services/RecipeService";
import { Recipe } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RecipeOverview: React.FC = () => {
  const { RecipeId } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<Recipe>();

  const fetchRecipe = async (recipeId: string) => {



    const response = await RecipeService.getRecipeById(recipeId.toString());

    setRecipe(response);
  }

  useEffect(() => {
    fetchRecipe(RecipeId as string);
  }, [RecipeId]);

  return (
    <View className="flex-1 bg-black">
      {recipe && <SingleRecipe recipe={recipe}/> ||
          <View
              testID="recipe-loading"
              className="bg-white">
          </View>
      }
      <Navbar/>
    </View>

  );
}

export default RecipeOverview;