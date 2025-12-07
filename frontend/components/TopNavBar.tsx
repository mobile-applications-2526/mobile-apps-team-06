import { Link } from "expo-router";
import { Search } from "lucide-react-native";
import { View } from "react-native"

const TopNavBar: React.FC = () => {
    return (
        <View className="absolute top-10 left-0 right-0 z-50 pt-4 px-4 flex-row justify-end">
            <Link className="p-2 rounded-full" href={"/search"}>
            <Search width={30} height={30} color={"#fff"} />
            </Link>
        </View>
    )
}

export default TopNavBar;