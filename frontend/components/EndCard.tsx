import { View, Text, useWindowDimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChefHat, ArrowUp } from "lucide-react-native";

type Props = {
    onScrollToTop?: () => void;
};

const EndCard = ({ onScrollToTop }: Props) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    return (
        <View style={{ height: windowHeight, width: windowWidth }}>
            <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={{ flex: 1 }}
            >
                <View style={{ paddingBottom: insets.bottom + 24 }} className="flex-1 justify-center items-center px-8">
                    <ChefHat size={80} color="#fff" strokeWidth={1.5} />

                    <Text className="text-white text-4xl font-bold text-center mt-8">
                        You've reached the end!
                    </Text>

                    <Text className="text-white/70 text-base text-center mt-4 leading-relaxed">
                        You've seen all available recipes. Check back later for more delicious recipes or add your own!
                    </Text>

                    <TouchableOpacity
                        className="mt-8 bg-white rounded-full px-8 py-4 flex-row items-center gap-2"
                        onPress={onScrollToTop}
                    >
                        <ArrowUp size={20} color="#000" />
                        <Text className="text-black font-semibold text-base">
                            Back to Top
                        </Text>
                    </TouchableOpacity>

                    <View className="border-t border-white/20 pt-4 mt-8 items-center">
                        <Text className="text-white/50 text-sm">
                            That's all for now
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default EndCard;