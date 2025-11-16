import { LoggedInUser } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const CheckIfAuthenticated = () => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>();
    const router = useRouter();
    
    const fetchLoggedInUser = async() => {
        try {
            const value = await AsyncStorage.getItem("loggedInUser");
            const parsedValue = value ? JSON.parse(value) : null;

            if (!parsedValue) {
                router.push("/login")
            }

            setLoggedInUser(parsedValue);
        } catch (e) {
            throw new Error("Could not fetch the user data");
        }
    }

    useEffect(() => {
        fetchLoggedInUser()
    }, [])

    return (
        <>
        </>
    )
}

export default CheckIfAuthenticated;