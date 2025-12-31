import UserService from "@/services/UserService";
import { LoggedInUser, UserLoginInput } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [statusSuccess, setStatusSuccess] = useState("");
    const router = useRouter();

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setStatusError("");
        setStatusSuccess("");
    }

    const validate = () => {
        if (!email || !password) {
            Alert.alert("Validation", "Please enter email and password.");
            setEmailError("Please enter email and password.");
            setPasswordError("Please enter email and password.");
            return false;
        }
        if (!email.includes("@")) {
            Alert.alert("Validation", "Please enter a valid email address.");
            setEmailError("Please enter a valid email address.");
            return false;
        }
        return true;
    }

    const handleSubmit = async() => {
        clearErrors()
        if (!validate()) return;

        const userInput: UserLoginInput = {
            email, password
        }

        const response = await UserService.login(userInput);

        if (response?.ok) {
            const loggedInUser: LoggedInUser = await response.json();
            await AsyncStorage.setItem("loggedInUser", JSON.stringify({
                token: loggedInUser.token,
                username: loggedInUser.username,
                role: loggedInUser.role
            }));
            setStatusSuccess("Successfully logged in! Redirecting you to the home page...")
            router.replace('/');
        } else {
            setStatusError("Error occured while trying to log in! Try again...")
            console.error("Error setting storage in login");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-black justify-center px-6"
        >

            {/* Form Container */}
            <View className="w-full m-auto" style={{ maxWidth: 420 }}>
                {/* Logo / Title */}
                <Text className="text-white text-3xl font-extrabold text-center">
                    Log in to Recipez
                </Text>

                {/* Email Field */}
                <View className="mb-5">
                    <Text className="text-gray-300 mb-2 text-sm">Email</Text>
                    <TextInput
                        testID="emailInput"
                        className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="you@example.com"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password Field */}
                <View className="mb-5">
                    <Text className="text-gray-300 mb-2 text-sm">Password</Text>
                    <TextInput
                        testID="passwordInput"
                        className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                        placeholder="••••••••"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                    {emailError && <Text className="text-red-500 font-semibold text-base text-center">
                        {emailError}
                    </Text>}
                    {statusError && <Text className="text-red-500 font-semibold text-base text-center">
                        {statusError}
                    </Text>}
                    {statusSuccess && <Text className="text-red-500 font-semibold text-base text-center">
                        {statusSuccess}
                    </Text>}

                {/* Log in Button */}
                <TouchableOpacity
                    testID="loginButton"
                    className="bg-red-500 py-3 rounded-lg items-center mt-2"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-semibold text-base">
                        Log in
                    </Text>
                </TouchableOpacity>
                <View className="flex-row pt-10 justify-center">
                    <Text className="text-center text-gray-400">
                        Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.replace("/signup")}>
                        <Text className="text-red-500 font-semibold">
                        Create one right here!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginForm;
