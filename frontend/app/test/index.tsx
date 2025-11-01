import { View, Text} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

const Test2 = () => {
  return (
    <View className="flex-1 bg-white">
        <Text className=" text-2xl text-red font-bold text-center"> Test page</Text>
        <Link className=" m-auto text-blue-500 text-2xl" href="/">home</Link>
    </View>
  );
}

export default Test2;