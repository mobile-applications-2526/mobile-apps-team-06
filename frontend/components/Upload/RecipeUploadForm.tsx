import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text, TextInput, TouchableOpacity, Pressable, Modal, ScrollView, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {Picker} from "@react-native-picker/picker"
import DynamicInputList from "./DynamicListComponent";
import { RecipeInput } from "@/types/types";

const RecipeUploadForm: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");
    const [showPicker, setShowPicker] = useState(false);
    const [prepareTime, setPrepareTime] = useState<string>("0");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    // Status messages
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const clearError = () => {
        setError("");
    }

    const validateFields = (): boolean => {
        if (!image || !description || !difficulty || !prepareTime || !ingredients || !steps || !tags) {
            setError("You need to fill up all the fields!");
            return false;
        } else {
            return true;
        }
    }

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

    const uploadRecipe = async() => {
        clearError()

        if (!validateFields()) return;

        const recipeInput: RecipeInput = {
            title,
            description,
            difficulty,
            prepare_time: prepareTime,

        }
    }
    

    useEffect(() => {
        //launchCamera()
    },[])

    return (
        <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="flex-1 bg-black justify-center px-6 pt-20"
                >
                    <ScrollView>
        
                    {/* Form Container */}
                    <View className="w-full m-auto pb-20" style={{ maxWidth: 420 }}>
                        {/* Logo / Title */}
                        <Text className="text-white text-3xl font-extrabold text-center mb-5">
                            Upload your recipe here!
                        </Text>

                        {/* Image field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Image</Text>
                            <Pressable 
                                className="border border-dotted border-gray-300 active:border-red-500"
                                onPress={launchCamera}
                            >
                                <Text className="text-gray-300 text-center text-sm p-5">Click to upload your image</Text>
                            </Pressable>
                            {image && 
                                <View>
                                    <Text className="text-gray-300 mt-2 mb-2 text-sm">Selected image:</Text>
                                    <Image
                                        source={{uri: image}}
                                        className="w-full aspect-square"
                                        resizeMode="cover"
                                    />
                                    <Pressable 
                                        className="border bg-red-500 mt-2"
                                        onPress={() => setImage(null)}
                                    >
                                        <Text className="text-gray-300 text-center text-sm p-5">Remove image</Text>
                                    </Pressable>
                                </View>
                            }
                        </View>
        
                        {/* title Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Title</Text>
                            <TextInput
                                className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                                keyboardType="default"
                                autoCapitalize="none"
                                placeholder="Cooked samon"
                                placeholderTextColor="#777"
                                onChangeText={(e) => setTitle(e)}
                                value={title}
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
                                onChangeText={(e) => setDescription(e)}
                                value={description}
                            />
                        </View>

                        {/* Difficulty Field */}
                        <View className="mb-5">
                        <Text className="text-gray-300 mb-2 text-sm">Difficulty</Text>

                        <Pressable
                            onPress={() => setShowPicker(true)}
                            className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 justify-center"
                        >
                            <Text className="text-white">
                            {difficulty || "Select Difficulty"}
                            </Text>
                        </Pressable>
                        </View>

                        <Modal visible={showPicker} transparent animationType="slide">
                            <View className="flex-1 justify-end bg-black/40">
                                <View className="bg-neutral-900 p-4 border-t border-neutral-700">

                                <Picker
                                    selectedValue={difficulty}
                                    onValueChange={(value) => {
                                    setDifficulty(value);
                                    setShowPicker(false);
                                    }}
                                    style={{color: "white"}}
                                    dropdownIconColor="#fff"
                                >
                                    <Picker.Item label="Very easy" value="Very easy" />
                                    <Picker.Item label="Easy" value="Easy" />
                                    <Picker.Item label="Medium" value="Medium" />
                                    <Picker.Item label="Hard" value="Hard" />
                                    <Picker.Item label="Very hard" value="Very hard" />
                                </Picker>
                                </View>
                            </View>
                        </Modal>

                        {/* Prepare time Field */}
                        <View className="mb-5">
                            <Text className="text-gray-300 mb-2 text-sm">Prepare time (in minutes)</Text>
                            <TextInput
                                className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                                placeholder="0"
                                placeholderTextColor="#777"
                                keyboardType="default"
                                onChangeText={(e) => setPrepareTime(e)}
                                value={prepareTime}
                            />
                        </View>

                        {/* Ingredients Field */}
                        <DynamicInputList
                            label="Ingredients"
                            values={ingredients}
                            onChange={setIngredients}
                            placeholder="Salmon"
                            />
                        
                        {/* Steps Field */}
                        <DynamicInputList
                            label="Steps"
                            values={steps}
                            onChange={setSteps}
                            placeholder="Dinner"
                            />

                        {/* Tags Field */}
                        <DynamicInputList
                            label="Tags"
                            values={tags}
                            onChange={setTags}
                            placeholder="Dinner"
                            />
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>
    )
}

export default RecipeUploadForm;