import UserService from '@/services/UserService';
import { LoggedInUser } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
    children: ReactNode
}

const CheckIfAuthenticated = ({children}: Props) => {
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);
    const router = useRouter();
    
    const fetchLoggedInUser = async() => {
        try {
            const value = await AsyncStorage.getItem("loggedInUser");
            const parsedValue: LoggedInUser = value ? JSON.parse(value) : null;
            
            if (!parsedValue || !parsedValue.token || !parsedValue.username || !parsedValue.role) {
                setRedirecting(true);
                router.replace("/login")
                return
            } else {
                setLoading(false);
            }
            
            if (parsedValue.token) {
                const response = await UserService.checkAuth();

                if (!response?.ok) {
                    setRedirecting(true);
                    AsyncStorage.clear()
                    router.replace("/login")
                    return
                }
            }
            
        } catch (e) {
            console.error("Could not fetch the user data");
            router.replace("/login");
        }
    }

    useEffect(() => {
        fetchLoggedInUser();
    }, [])

    if (redirecting || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
    }
    return <>{children}</>;
}

export default CheckIfAuthenticated;