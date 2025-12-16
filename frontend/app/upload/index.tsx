import DimensionsHelper from "@/components/DimensionsHelper";
import Navbar from "@/components/Navbar";
import RecipeUploadForm from "@/components/Upload/RecipeUploadForm";
import { View } from "react-native";

const UploadPage = () => {
    return (
        <>
            <View className="bg-black flex-1">
                <RecipeUploadForm/>
                <Navbar/>
            </View>
        </>
    )
}

export default UploadPage;