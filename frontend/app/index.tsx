import Navbar from "@/components/Navbar";
import RecipeFeed from "@/components/RecipeFeed";
import TopNavBar from "@/components/TopNavBar";
import { View } from "react-native";

const Home = () => {
  return (
      <View className="flex-1">
        <TopNavBar/>
        <RecipeFeed />
        <Navbar />
      </View>
  );
};

export default Home;