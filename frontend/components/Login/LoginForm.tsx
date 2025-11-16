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

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert("Validation", "Please enter email and password.");
            return;
        }
        if (!email.includes("@")) {
            Alert.alert("Validation", "Please enter a valid email address.");
            return;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 justify-center items-center p-4"
        >
            <View className="bg-white rounded-lg p-5 shadow-md w-full" style={{ maxWidth: 400 }}>
            <Text className="text-lg font-semibold mb-3 text-center text-black">Sign in</Text>

            <Text className="text-sm  mt-2 text-black">Email</Text>
            <TextInput
                className="h-11 border border-gray-200 rounded-md px-3 mt-1 bg-gray-50 w-full text-black"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="you@example.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                textContentType="emailAddress"
            />

            <Text className="text-sm mt-3 text-black">Password</Text>
            <TextInput
                className="h-11 border border-gray-200 rounded-md px-3 mt-1 bg-gray-50 w-full text-black"
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                textContentType="password"
            />

            <TouchableOpacity
                className="mt-4 bg-blue-500 py-3 rounded-md items-center w-full"
                onPress={handleSubmit}
            >
                <Text className="text-white font-semibold">Log in</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginForm;
