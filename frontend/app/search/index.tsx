import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar from "@/components/Navbar";
import DisplaySearchHistory from "@/components/Search/DisplaySearchHistory";
import SearchBar from "@/components/Search/SearchBar";
import useSearchHistory from "@/components/Search/useSearchHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const SearchPage: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const {searchHistory, addSearch, clearHistory, removeFromHistory} = useSearchHistory();
    const router = useRouter();

    const submitSearch = () => {
        addSearch(search);
        router.push({
            pathname: '/search/[SearchTermPage]',
            params: { SearchTermPage: encodeURIComponent(search.trim()) },
        });
    }

    return (
        <CheckIfAuthenticated>
            <View className="flex-1 bg-black">
                <SearchBar
                    placeholder={"Type something here..."}
                    onChangeText={(text: string) => setSearch(text)}
                    value={search}
                    onSearch={() => submitSearch()}
                />
                <DisplaySearchHistory onRemove={removeFromHistory} history={searchHistory}/>
                <Navbar/>
            </View>
        </CheckIfAuthenticated>
    );
}

export default SearchPage;