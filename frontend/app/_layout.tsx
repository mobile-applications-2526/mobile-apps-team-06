import { Stack } from "expo-router";
import "../styles/globals.css";

export default function RootLayout() {
 return (
    <Stack
        screenOptions={{
            headerShown: false,
          }}
      >
      <Stack.Screen 
      name="index"
      options={
        {animation: "none"}
      }
      />
      <Stack.Screen 
      name="search/index"
      options={
        {animation: "none"}
      }
      />
      <Stack.Screen 
      name="upload/index"
      options={
        {animation: "none"}
      }
      />
    </Stack>
  );
}
