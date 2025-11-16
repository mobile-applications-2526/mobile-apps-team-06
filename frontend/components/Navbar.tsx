import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export const NAVBAR_HEIGHT = 72;

const Navbar = () => {
    return (
        <>
            <View style={{height: NAVBAR_HEIGHT}} className="flex-row justify-center gap-20 p-5 bg-white">
                <Link className="text-lg text-slate-700" href={"/"}>Home</Link>
                <Link className="text-lg text-slate-700" href={"/upload"}>Upload</Link>
                <Link className="text-lg text-slate-700" href={"/account"}>Account</Link>
            </View>
        </>
    )
}

export default Navbar;