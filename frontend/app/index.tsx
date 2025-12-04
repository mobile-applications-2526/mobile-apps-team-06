import { View } from "react-native";
import Navbar from "@/components/Navbar";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import RecipeFeed from "@/components/RecipeFeed";

const Home = () => {
  return (
    <CheckIfAuthenticated>
      <View className="flex-1">
        <RecipeFeed />
        <Navbar />
      </View>
    </CheckIfAuthenticated>
  );
};

export default Home;