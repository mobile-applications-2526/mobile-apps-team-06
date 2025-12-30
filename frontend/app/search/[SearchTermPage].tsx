import CheckIfAuthenticated from "@/components/CheckIfAuthenticated";
import Navbar from "@/components/Navbar";
import DisplaySearchedResults from "@/components/Search/DisplaySearchedResults";
import SearchBar from "@/components/Search/SearchBar";
import useSearchHistory from "@/components/Search/useSearchHistory";
import { Recipe } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native"

const SearchTermPage = () => {
    const { SearchTermPage } = useLocalSearchParams();
    // console.log(SearchTermPage)
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
            <View className="flex-1 bg-black">
                <SearchBar
                    placeholder={"Type something here..."}
                    onChangeText={(text: string) => setSearch(text)}
                    value={search}
                    onSearch={() => submitSearch()}
                />
                <DisplaySearchedResults searchterm={SearchTermPage as string}/>
                <Navbar/>
            </View>
    )
}

export default SearchTermPage;