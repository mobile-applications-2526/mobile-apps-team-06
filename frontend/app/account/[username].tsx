import Profile from "@/components/Account/Profile";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";
import UserService from "@/services/UserService";
import { User } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const SingleAccountPage = () => {
    const [user, setUser] = useState<User>();
    const { username } = useLocalSearchParams();

    
    const fetchUserProfile = async() => {
        try {
            const response = await UserService.fetchUserProfileByUsername(username as string);
            const user: User = await response?.json()
            if (!response?.ok || !user) {
                console.error("User profile could not be fetched");
            }
            setUser(user);
        } catch (e) {
            console.error("Error fetching profile: " + e);
        }

    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <CheckIfAuthenticated>
            <View className="flex-1 bg-black">
                <Profile user={user}/>
                <Navbar />
            </View>
        </CheckIfAuthenticated>
    )
}

export default SingleAccountPage;