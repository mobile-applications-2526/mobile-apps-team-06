import RecipeService from "@/services/RecipeService";
import { PaginatedRecipesResponse, Recipe } from "@/types/types"
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, FlatList } from "react-native"

type Props = {
    searchterm: string;
}

const DisplaySearchedResults: React.FC<Props> = ({searchterm}: Props) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

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

return (
    <View>
        
    </View>
    );
}

export default DisplaySearchedResults;