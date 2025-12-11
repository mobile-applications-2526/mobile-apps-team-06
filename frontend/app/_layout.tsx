import { Stack, useSegments } from "expo-router";
import "../styles/globals.css";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";

const PUBLIC_ROUTES = ["login", "signup"];

export default function RootLayout() {
  const segments = useSegments();
  const routeName = segments[0] ?? "";

  const stack = (
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
  )

  if (PUBLIC_ROUTES.includes(routeName)) {
    return stack;
  }

 return (
    <CheckIfAuthenticated>{stack}</CheckIfAuthenticated>
  );
}
