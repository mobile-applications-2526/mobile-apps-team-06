import { Dimensions, FlatList, View, ActivityIndicator, Text } from "react-native";
import RecipeCard from "../components/RecipeCard";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import { useEffect, useState, useCallback } from "react";
import { RecipeService } from "@/services/RecipeService";

const { height: windowHeight } = Dimensions.get("window");
const ITEM_HEIGHT = Math.max(0, windowHeight - NAVBAR_HEIGHT);

const Home = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Load initial recipes
  useEffect(() => {
    loadRecipes(0, true);
  }, []);

  const loadRecipes = async (pageNum: number, isInitial = false) => {
    if (loading) return;
    
    setLoading(true);
    if (isInitial) setInitialLoading(true);

    try {
      const data = await RecipeService.getRecipes(pageNum, 10);
      console.log(`Loaded page ${pageNum}:`, data);
     
      if (pageNum === 0) {
        // First load, replace all recipes
        setRecipes(data.content);
      } else {
        // Load more - append to existing
        setRecipes(prev => [...prev, ...data.content]);
      }
      
      setHasMore(!data.last); // Spring Boot tells us if there are more pages
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
      console.log(`Loading more recipes... (page ${page + 1})`);
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
      <CheckIfAuthenticated>
        <View className="flex-1 bg-black justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading recipes...</Text>
        </View>
      </CheckIfAuthenticated>
    );
  }

  return (
    <CheckIfAuthenticated>
      <View className="flex-1">
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          
          // Pagination
          pagingEnabled
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          
          // Performance
          getItemLayout={getItemLayout}
          removeClippedSubviews
          maxToRenderPerBatch={3}
          windowSize={5}
          initialNumToRender={2}
          
          // Infinite scroll
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          
          // Visual
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          style={{flex: 1}}
        />
        <Navbar />
      </View>
    </CheckIfAuthenticated>
  );
};

export default Home;