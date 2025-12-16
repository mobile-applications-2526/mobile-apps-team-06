import { Dimensions, FlatList, View, ActivityIndicator, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import { NAVBAR_HEIGHT } from "./Navbar";
import { Recipe } from "@/types/types";
import RecipeService from "@/services/RecipeService";

const { height: windowHeight } = Dimensions.get("window");
const ITEM_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

const RecipeFeed = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadRecipes(0, true);
  }, []);

  const loadRecipes = async (pageNum: number, isInitial = false) => {
    if (loading) return;
    
    setLoading(true);
    if (isInitial) setInitialLoading(true);

    try {
      const data = await RecipeService.getRecipes(pageNum, 10);
      
      if (pageNum === 0) {
        setRecipes(data.content);
      } else {
        setRecipes(prev => [...prev, ...data.content]);
      }
      
      setHasMore(!data.last);
      setPage(pageNum);
      
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
      if (isInitial) setInitialLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadRecipes(page + 1);
    }
  }, [hasMore, loading, page]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ height: ITEM_HEIGHT }} className="justify-center items-center bg-black">
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
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.id}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      
      pagingEnabled
      snapToInterval={ITEM_HEIGHT}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum={true}
      
      getItemLayout={getItemLayout}
      removeClippedSubviews
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={2}
      
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentInsetAdjustmentBehavior="never"
      style={{flex: 1}}
    />
  );
};

export default RecipeFeed;