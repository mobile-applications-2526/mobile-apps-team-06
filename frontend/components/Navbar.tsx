import { Link, Stack, useRouter } from "expo-router";
import { Home, PersonStanding, Plus, User } from "lucide-react-native";
import { View, Text } from "react-native";

export const NAVBAR_HEIGHT = 72;

const Navbar = () => {
    const router = useRouter();

    return (
        <>
            <View style={{height: NAVBAR_HEIGHT}} className="absolute bottom-0 left-0 right-0 w-full flex-row justify-around items-center bg-black border-t border-white/10">
                <Link className="text-lg text-slate-700" href={"/"}>
                    <Home color={"white"}/>
                </Link>
                <Link className="text-lg text-slate-700" href={"/upload"}>
                    <Plus color={"white"}/>
                </Link>
                <Link className="text-lg text-slate-700" href={"/account"}>
                    <User color={"white"}/>
                </Link>
            </View>
        </>
    )
}

export default Navbar;