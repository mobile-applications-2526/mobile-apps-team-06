import UserService from "@/services/UserService";
import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();
    
    const handleLogOut = async() => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error("Could not clear AsyncStorage.")
        }
    }

    const fetchUserProfile = async() => {
        try {
            const response = await UserService.fetchUserProfile();
            if (!response?.ok || !response?.json()) {
                console.error("User profile could not be fetched");
            }
            setUser(await response?.json());
        } catch (e) {
            console.error("Error fetching profile" + e);
        }

    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <View>
        </View>
    )
}
export default Profile;