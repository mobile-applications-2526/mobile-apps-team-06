import UserService from "@/services/UserService";
import { LoggedInUser, UserSignupInput } from "@/types/types";
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

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [statusError, setStatusError] = useState("");
    const [statusSuccess, setStatusSuccess] = useState("");
    const router = useRouter();

    const clearErrors = () => {
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setStatusError("");
        setStatusSuccess("");
    }

    const validate = () => {
        if (!username || !email || !password) {
            Alert.alert("Validation", "Please enter username, email and password.");
            setUsernameError("Please enter username, email and password.");
            setEmailError("Please enter username, email and password.");
            setPasswordError("Please enter username, email and password.");
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
        clearErrors();
        if (!validate()) return;

        const userInput: UserSignupInput = {
            username, email, password
        }

        const response = await UserService.signUp(userInput);

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
            console.error("Error setting storage in sign up");
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
                    Sign up to Recipez
                </Text>

                {/* Username Field */}
                <View className="mb-5">
                    <Text className="text-gray-300 mb-2 text-sm">Username</Text>
                    <TextInput
                        testID="usernameInput"
                        className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                        keyboardType="default"
                        autoCapitalize="none"
                        placeholder="Username"
                        placeholderTextColor="#777"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

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
                    testID="signupButton"
                    className="bg-red-500 py-3 rounded-lg items-center mt-2"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-semibold text-base">
                        Sign up
                    </Text>
                </TouchableOpacity>
                <View className="flex-row pt-10 justify-center">
                    <Text className="text-center text-gray-400">
                        Have an account already?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.replace("/login")}>
                        <Text className="text-red-500 font-semibold">
                        Login in!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignupForm;
