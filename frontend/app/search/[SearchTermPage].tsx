import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Search/SearchBar";
import useSearchHistory from "@/components/Search/useSearchHistory";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native"

const SearchTermPage = () => {
    const { SearchTermPage } = useLocalSearchParams();
    console.log(SearchTermPage)
    const [search, setSearch] = useState<string>(SearchTermPage as string);
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
                <Navbar/>
            </View>
        </CheckIfAuthenticated>
    )
}

export default SearchTermPage;