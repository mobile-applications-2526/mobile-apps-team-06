import { Link } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import { TextInput, TouchableOpacity, View, Text} from "react-native";

type Props = {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({placeholder, onChangeText, value, onSearch}: Props) => {
    return (
        <View className="w-full px-4 py-2 top-16">
            <View className="flex-row items-center space-x-3">
                <Link href={"../"}>
                    <ChevronLeft color="#fff" size={26} />
                </Link>

                <View className="flex-row items-center bg-[#1f1f1f] rounded-full px-4 py-2 flex-1">
                    <Search size={18} color="#a1a1a1" />

                    <TextInput
                        className="ml-2 flex-1 text-white text-[15px]"
                        placeholder={placeholder}
                        placeholderTextColor="#7a7a7a"
                        onChangeText={onChangeText}
                        value={value}
                    />
                </View>

                <TouchableOpacity
                    className="items-center pl-3"
                    onPress={onSearch}
                >
                    <Text className="text-white font-semibold text-base">
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchBar;