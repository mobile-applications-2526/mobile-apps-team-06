import UserService from "@/services/UserService";
import { LoggedInUser, User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Pressable, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { ArrowLeft, Grid3x3, Heart } from "lucide-react-native";

type Props = {
    user: User | undefined;
}

const Profile: React.FC<Props> = ({user}: Props) => {
    const [activeTab, setActiveTab] = useState<"posts" | "favorites">("posts");
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const router = useRouter();

    const fetchLoggedInUser = async() => {
        try {
            const response = await AsyncStorage.getItem("loggedInUser");
            if (!response) {
                console.error("Could not fetch the logged in user")
            }
            setLoggedInUser(response ? JSON.parse(response) : null);
        } catch (e) {
            console.error("Could not fetch logged in user " + e)
        }
    }
    
    const handleLogOut = async() => {
        try {
            await AsyncStorage.clear();
            router.replace("/login")
        } catch (e) {
            console.error("Could not clear AsyncStorage.")
        }
    }

    useEffect(() => {
        fetchLoggedInUser();
    }, [])


    if (!user) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View>
            {/* Header */}
            <View className="sticky top-0 z-50 bg-black backdrop-blur-lg border-b border-white/10 px-4 py-4">
                <View className="flex-row items-center gap-4 pt-10">
                    <Pressable
                        onPress={() => router.replace("/")}
                        className="text-white"
                    >
                    <ArrowLeft color={"white"} className="w-6 h-6" />
                    </Pressable>
                    <Text className="text-xl text-white">@{user.username}</Text>
                </View>
            </View>
            
            {/* Post info + Log out button */}
            <View className="px-4 py-6 space-y-6 bg-black">
                {/* Stats */}
                <View className="flex gap-8">
                <View className="text-center">
                    <Text className="text-xl text-white">{user.profile.posts.length}</Text>
                    <Text className="text-sm text-white/60">Posts</Text>
                </View>
                </View>

                {/* Bio */}
                <View className="space-y-2 pt-5">
                    <Text className="text-l text-white/80">
                        {user.profile.bio}
                    </Text>
                </View>
                
                {/* Log out button */}
                {user.username == loggedInUser?.username && <View className="pt-5">
                    <Pressable onPress={() => handleLogOut()} className="w-full py-2 bg-red-500 rounded-lg active:bg-white/20">
                        <Text className="text-center text-white text-base">Log out</Text>
                    </Pressable>
                </View>}
            </View>

            {/* Tabs */}
            <View className="border-b border-white/10 bg-black flex-row">
                <Pressable
                    onPress={() => setActiveTab("posts")}
                    className={`flex-1 py-3 items-center justify-center gap-2 border-b-2 ${
                        activeTab === "posts" ? "border-white" : "border-transparent"
                    }`}
                >
                    <Grid3x3 color="white" className="w-5 h-5" />
                </Pressable>

                <Pressable
                    onPress={() => setActiveTab("favorites")}
                    className={`flex-1 py-3 items-center justify-center gap-2 border-b-2 ${
                        activeTab === "favorites" ? "border-white" : "border-transparent"
                    }`}
                >
                    <Heart color="white" className="w-5 h-5" />
                </Pressable>
            </View>

            {/* Tab Content */}
            {/* <View className="flex-1">
                {activeTab === "posts" && (
                    <RecipeGrid
                        recipes={user.profile.posts}
                    />
                )}

                {activeTab === "favorites" && (
                    <RecipeGrid
                        recipes={user.profile.favorites}
                    />
                )}
            </View> */}
            
        </View>
    )
}
export default Profile;