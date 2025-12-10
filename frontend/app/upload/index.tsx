import DimensionsHelper from "@/components/DimensionsHelper";
import Navbar from "@/components/Navbar";
import { View } from "react-native";

const UploadPage = () => {
    return (
        <>
            <View style={{flex:1}}>
                <DimensionsHelper/>
                <Navbar/>
            </View>
        </>
    )
}

export default UploadPage;