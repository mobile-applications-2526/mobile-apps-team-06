import { View } from "react-native";
import Navbar from "@/components/Navbar";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import RecipeFeed from "@/components/RecipeFeed";
import TopNavBar from "@/components/TopNavBar";

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