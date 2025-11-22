import Profile from "@/components/Account/Profile";
import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar from "@/components/Navbar";
import { View } from "react-native";

const AccountPage = () => {
    return (
        <CheckIfAuthenticated>
            <View>
                <Profile/>
                <Navbar/>
            </View>
        </CheckIfAuthenticated>
    )
}

export default AccountPage;