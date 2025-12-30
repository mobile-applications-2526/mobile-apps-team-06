import RecipeService from "@/services/RecipeService";
import { PaginatedRecipesResponse, Recipe } from "@/types/types"
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, FlatList, Pressable, Image, Dimensions, Animated } from "react-native"
import {format} from 'date-fns'
import DateFormatter from "../DateFormatter";
import { Heart } from "lucide-react-native";
import {router, useRouter} from "expo-router";

type Props = {
    searchterm: string;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 24) / 2; // 12px padding each side, 12px between cards
const CARD_HEIGHT = CARD_WIDTH * 1.5; // taller rectangle like TikTok

const DisplaySearchedResults: React.FC<Props> = ({searchterm}: Props) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const router = useRouter();

    const loadRecipes = async(pageNum: number, isInitial = false) => {
        if (loading) return;

        setLoading(true)
        if (isInitial) setInitialLoading(true);

        try {
            const data: PaginatedRecipesResponse = await RecipeService.searchRecipes(pageNum, 10, searchterm)
            if (pageNum === 0) {
                setRecipes(data.content);
            } else {
                setRecipes(prev => [...prev, ...data.content])
            }

            setHasMore(!data.last);
            setPage(pageNum);
        } catch (error) {
            console.error("Error loading searched recipes: ", error);
        } finally {
            setLoading(false);
            if (isInitial) setInitialLoading(false);
        }
    }

    useEffect(() => {
        loadRecipes(0, true);
    },[])

    const handleLoadMore = useCallback(() => {
        if (hasMore && !loading) {
            loadRecipes(page + 1);
        }
    }, [hasMore, loading, page])

    const renderFooter = () => {
        if (!loading) return null;
        return (
          <View className="justify-center items-center bg-black">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4">Loading more recipes...</Text>
          </View>
        );
      };

    if (initialLoading) {
        return (
        <View className="flex-1 bg-black justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4">Loading recipes...</Text>
        </View>
        );
    }

    const renderItem = ({ item }: { item: Recipe }) => {
        const scale = new Animated.Value(1);

        const onPressIn = () => {
            Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
            }).start();
        };

        const onPressOut = () => {
            Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            }).start();
        };

        return (
        <Pressable
            onPress={() => router.push(`/recipe/${item.id.id}`)}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            className="m-1"
        >
            <Animated.View
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transform: [{ scale }],
            }}
            className="rounded-xl overflow-hidden bg-gray-900"
            >
            {/* Image container */}
            <View className="flex-1 relative">
                <Image
                source={{ uri: item.coverImageURL }}
                className="w-full h-full"
                resizeMode="cover"
                />

                {/* Date overlay */}
                <View className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                <DateFormatter date={item.createdAt} />
                </View>

                {/* Bottom overlay for title and user */}
                <View className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                <Text className="text-white font-semibold text-[14px]" numberOfLines={2}>
                    {item.title}
                </Text>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-white text-[12px]">
                    {item.poster.user.username}
                    </Text>
                    <View className="flex-row items-center">
                        <Text className="text-gray-300 text-[12px] mr-1">
                        {item.favorites.length}
                        </Text>
                        <Heart color="#fff" width={12} />
                    </View>
                </View>
                </View>
            </View>
            </Animated.View>
        </Pressable>
        );
    };

    return (
        <FlatList
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.id}
            numColumns={2}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            className="px-1 pb-4 mt-16 mb-24"
        />
    );
};

export default DisplaySearchedResults;