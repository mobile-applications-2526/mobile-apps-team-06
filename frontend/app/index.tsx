import { ActivityIndicator, Dimensions, FlatList, View, Text } from "react-native";
import RecipeCard from "../components/RecipeCard";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import { useEffect, useState } from "react";
import { RecipeService } from "@/services/RecipeService";

const { height: windowHeight } = Dimensions.get("window");
const ITEM_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes on mount
    RecipeService.getRecipes(0, 10)
      .then(data => {
        console.log("Recipes loaded:", data);
        setRecipes(data.content); // Spring Boot returns { content: [...] }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <CheckIfAuthenticated>
        <View className="flex-1 bg-black justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading recipes...</Text>
        </View>
      </CheckIfAuthenticated>
    );
  }

  return (
    <CheckIfAuthenticated>
      <View className="flex-1">
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.id} // Your Recipe has nested id structure
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          pagingEnabled
          snapToInterval={ITEM_HEIGHT}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          style={{flex: 1}}
        />
        <Navbar />
      </View>
    </CheckIfAuthenticated>
  );
};
export default Home;