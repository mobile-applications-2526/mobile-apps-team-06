import { Dimensions, FlatList, View } from "react-native";
import RecipeCard from "../components/RecipeCard";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";

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

const { height: windowHeight } = Dimensions.get("window");
const ITEM_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

const Home = () => {
  return (
    <View className="flex-1">
      <FlatList
        data={testRecipes}
        keyExtractor={(item) => item.id}
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
  );
};

export default Home;
