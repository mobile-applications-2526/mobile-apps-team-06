import { Dimensions, FlatList } from "react-native";
import RecipeCard from "../components/RecipeCard";

const testRecipes = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    title: "Creamy Garlic Pasta",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    title: "Healthy Avocado Salad",
  },
  {
      id: "3",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      title: "Creamy Garlic Pasta",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      title: "Healthy Avocado Salad",
    },
];

const { height } = Dimensions.get("window");

const Home = () => {
  return (
    <FlatList
      data={testRecipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      pagingEnabled
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum={true}
      bounces={false}
      ContentInsetAdjustmentBehavior="never"
    />
  );
};

export default Home;
