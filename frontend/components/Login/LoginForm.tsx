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

    const validate = () => {
        if (!email || !password) {
            Alert.alert("Validation", "Please enter email and password.");
            return;
        }
        if (!email.includes("@")) {
            Alert.alert("Validation", "Please enter a valid email address.");
            return;
        }
    }

    const handleSubmit = () => {
        validate()
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
                        className="h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
                        placeholder="••••••••"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Log in Button */}
                <TouchableOpacity
                    className="bg-red-500 py-3 rounded-lg items-center mt-2"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-semibold text-base">
                        Log in
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginForm;
