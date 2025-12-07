import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Search/SearchBar";
import { useState } from "react";
import { View } from "react-native";

const SearchPage: React.FC = () => {
    const [search, setSearch] = useState("");

    return (
        <CheckIfAuthenticated>
            <View className="flex-1 bg-black">
                <SearchBar
                    placeholder={"Type something here..."}
                    onChangeText={(text: string) => setSearch(text)}
                    value={search}
                    onSearch={() => console.log("searching..")}
                />
                <Navbar/>
            </View>
        </CheckIfAuthenticated>
    );
}

export default SearchPage;