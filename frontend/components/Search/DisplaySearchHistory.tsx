import { Clock, X } from "lucide-react-native"
import { View, Text, Pressable } from "react-native"

type Props = {
    history: string[]
    onRemove: (item: string) => void;
}

const DisplaySearchHistory: React.FC<Props> = ({history, onRemove}: Props) => {
    return (
        <View className="px-4 mt-3 top-14">
            {history && history.map((item, idx) => (
                <View 
                    key={idx} 
                    className="flex-row items-center py-3 border-b border-neutral-800"
                >
                    {/* Left Icon */}
                    <Clock size={16} color="#9a9a9a" />

                    {/* Search Text */}
                    <Text className="text-white ml-3 flex-1 text-[15px]">
                        {item}
                    </Text>

                    {/* Clear Line Button */}
                    <Pressable onPress={() => onRemove(item)}>
                        <X size={18} color="#6b6b6b" />
                    </Pressable>
                </View>
                    ))}
        </View>
    )   
}

export default DisplaySearchHistory;