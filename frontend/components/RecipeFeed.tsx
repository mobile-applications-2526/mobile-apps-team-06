import { FlatList, View, ActivityIndicator, Text, useWindowDimensions } from "react-native";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import RecipeCard from "./RecipeCard";
import EndCard from "./EndCard";
import { NAVBAR_HEIGHT } from "./Navbar";
import { Recipe } from "@/types/types";
import RecipeService from "@/services/RecipeService";

type FeedItem = Recipe | { type: 'END_CARD' };

const RecipeFeed = () => {
  const { height: windowHeight } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);

  const ITEM_HEIGHT = useMemo(() => windowHeight, [windowHeight]);

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

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

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
      [ITEM_HEIGHT]
  );

  const renderItem = ({ item }: { item: FeedItem }) => {
    if ('type' in item && item.type === 'END_CARD') {
      return <EndCard onScrollToTop={scrollToTop} />;
    }
    return <RecipeCard recipe={item as Recipe} />;
  };

  const dataWithEndCard = useMemo<FeedItem[]>(() => {
    if (!hasMore && !loading && recipes.length > 0) {
      return [...recipes, { type: 'END_CARD' }];
    }
    return recipes;
  }, [recipes, hasMore, loading]);

  const renderFooter = () => {
    if (!loading || !hasMore) return null;
    return (
        <View style={{ height: ITEM_HEIGHT }} className="justify-center items-center bg-black">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading more recipes...</Text>
        </View>
    );
  };

  if (initialLoading) {
    return (
        <View
            testID="recipe-feed-loading"
            className="flex-1 bg-black justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading recipes...</Text>
        </View>
    );
  }

  return (
      <FlatList
          testID="recipe-feed"
          ref={flatListRef}
          data={dataWithEndCard}
          keyExtractor={(item, index) =>
              'type' in item && item.type === 'END_CARD' ? 'end-card' : (item as Recipe).id.id
          }
          renderItem={renderItem}

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
          ListFooterComponentStyle={{ height: loading && hasMore ? ITEM_HEIGHT : NAVBAR_HEIGHT }}

          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16}

          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
      />
  );
};

export default RecipeFeed;