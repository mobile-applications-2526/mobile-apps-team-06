import { Recipe } from "@/types/types";
import { useRef } from "react";
import { View, Image, Animated, Pressable, FlatList } from "react-native";

type Props = {
  recipes: Recipe[];
};

const GridItem = ({ item }: { item: Recipe }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

  return (
    <Pressable
      onPress={() => console.log(item.coverImageURL)}
      onPressIn={pressIn}
      onPressOut={pressOut}
      className="w-1/3 p-[1px]"
    >
      <Animated.View
        style={{ transform: [{ scale }] }}
        className="flex-1 overflow-hidden"
      >
        <Image
          source={
            item.coverImageURL
              ? { uri: item.coverImageURL }
              : { uri: "https://placehold.co/600x400/png" }
          }
          className="w-full aspect-square"
          resizeMode="cover"
        />
      </Animated.View>
    </Pressable>
  );
};

const RecipeProfileGrid: React.FC<Props> = ({ recipes }) => {
    const sortedRecipes = [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
  return (
    <FlatList
      data={sortedRecipes}
      keyExtractor={(item) => item.id.id}
      renderItem={({ item }) => <GridItem item={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      className="bg-black"
      columnWrapperStyle={{ gap: 0 }}
    />
  );
};

export default RecipeProfileGrid;
