import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function getToken() {
    try {
        const loggedInUser = await AsyncStorage.getItem("loggedInUser")
        if (!loggedInUser) {
            console.log("Item does not exist in AsyncStorage");
            return;
        }
        const token = JSON.parse(loggedInUser).token
        return token
    } catch (e) {
        console.error("Failed to get token from AsyncStorage", e);
        return;
    }
}