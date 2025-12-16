import { UserLock } from "lucide-react-native";
import { View, Text } from "react-native";

const IsPrivate: React.FC = () => {
    return (
        <View className="m-auto items-center p-10 gap-5">
            <UserLock color={"#fff"} size={50} className=""/>
            <Text className="text-white text-lg">This profile is private.</Text>
        </View>
    );
}

export default IsPrivate;