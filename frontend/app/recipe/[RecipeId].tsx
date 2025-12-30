import RecipeService from "@/services/RecipeService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {Recipe} from "@/types/types";
import SingleRecipe from "@/components/SingleRecipe";
import Navbar from "@/components/Navbar";

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
      {recipe && <SingleRecipe recipe={recipe}/>
      }
      <Navbar/>
    </View>

  );
}

export default RecipeOverview;