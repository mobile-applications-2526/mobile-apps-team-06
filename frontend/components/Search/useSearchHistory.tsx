import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const loadHistory = async() => {
        const savedHistory = await AsyncStorage.getItem("searchHistory")
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }

    const saveHistory = async(newHistory: string[]) => {
        setSearchHistory(newHistory);
        await AsyncStorage.setItem("searchHistory", JSON.stringify(newHistory));
        // console.log(await AsyncStorage.getItem("searchHistory"))
        // console.log(newHistory)
    }

    const addSearch = async(newSearch: string) => {
        if (!newSearch.trim()) return;

        let updatedHistory = searchHistory.filter(item => item != newSearch);

        updatedHistory.unshift(newSearch);

        updatedHistory = updatedHistory.slice(0, 10);

        await saveHistory(updatedHistory);
    }

    const clearHistory = async() => {
        await AsyncStorage.removeItem("searchHistory");
        setSearchHistory([]);
    }

    const removeFromHistory = async (term: string) => {
        const filtered = searchHistory.filter(item => item !== term);
        await saveHistory(filtered);
    };

    useEffect(() => {
        loadHistory();
    }, [])

    return {
        searchHistory,
        addSearch,
        clearHistory,
        removeFromHistory
    }

}

export default useSearchHistory;