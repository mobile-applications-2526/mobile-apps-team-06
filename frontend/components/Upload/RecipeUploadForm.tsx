import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text, TextInput, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {Picker} from "@react-native-picker/picker"

const RecipeUploadForm: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [prepareTime, setPrepareTime] = useState<number>(0);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [posterUsername, setPosterUsername] = useState<string>("");


    const requestPermission = async(): Promise<boolean> => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (!permissionResult.granted) {
            return false;
        }

        return true;
    }

    const launchCamera = async() => {

        if (!requestPermission) return;

        let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
                allowsMultipleSelection: false
            }
        )

        if (result.canceled) {
            return;
        }

        setImage(result.assets[0].uri);
    }

    useEffect(() => {
        //launchCamera()
    },[])

    return (
        <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="flex-1 bg-black justify-center px-6"
                >
        
                    {/* Form Container */}
                    <View className="w-full m-auto" style={{ maxWidth: 420 }}>
                        {/* Logo / Title */}
                        <Text className="text-white text-3xl font-extrabold text-center">
                            Upload your recipe here!
                        </Text>
        
                        {/* title Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Title</Text>
                            <TextInput
                                className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                                keyboardType="default"
                                autoCapitalize="none"
                                placeholder="Cooked samon"
                                placeholderTextColor="#777"
                            />
                        </View>
        
                        {/* Description Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Description</Text>
                            <TextInput
                                className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                                placeholder="A fun, delicious and easy cooked samon recipe!"
                                placeholderTextColor="#777"
                                keyboardType="default"
                            />
                        </View>

                        {/* Difficulty Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Difficulty</Text>

                            <View className="h-12 rounded-lg bg-neutral-900 border border-neutral-700 px-2 justify-center">
                                {/* <Picker
                                selectedValue={difficulty}
                                onValueChange={(value) => setDifficulty(value)}
                                dropdownIconColor="#fff"
                                style={{ color: "white", height: 50 }}
                                >
                                    <Picker.Item label="Easy" value="Easy" />
                                    <Picker.Item label="Medium" value="Medium" />
                                    <Picker.Item label="Hard" value="Hard" />
                                </Picker> */}
                            </View>
                        </View>

                        {/* Prepare time Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Prepare time (in minutes)</Text>
                            <TextInput
                                className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                                placeholder="0"
                                placeholderTextColor="#777"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
    )
}

export default RecipeUploadForm;