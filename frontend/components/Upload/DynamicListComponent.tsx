import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";

type Props = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export default function DynamicInputList({
  label,
  values,
  onChange,
  placeholder = "Enter value",
}: Props) {
  
  const addItem = () => {
    onChange([...values, ""]);
  };

  const updateItem = (text: string, index: number) => {
    const copy = [...values];
    copy[index] = text;
    onChange(copy);
  };

  const removeItem = (index: number) => {
    const filtered = values.filter((_, i) => i !== index);
    onChange(filtered);
  };

  return (
    <View className="mb-5">
      
      {/* Label + Add button */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-300 text-sm">{label}</Text>

        <Pressable
          onPress={addItem}
          className="bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-700"
        >
          <Text className="text-white text-lg">+</Text>
        </Pressable>
      </View>

      {/* Dynamic Fields */}
      {values.map((item, index) => (
        <View key={index} className="mb-3 flex-row items-center">
          
          <TextInput
            className="flex-1 h-12 rounded-lg px-4 bg-neutral-900 border border-neutral-700 text-white"
            placeholder={`${placeholder}`}
            placeholderTextColor="#777"
            value={item}
            onChangeText={(text) => updateItem(text, index)}
          />

          {/* Remove button */}
          <Pressable
            onPress={() => removeItem(index)}
            className="ml-2 bg-red-800 px-3 py-2 rounded-lg border border-red-700"
          >
            <Text className="text-white text-sm">−</Text>
          </Pressable>

        </View>
      ))}
    </View>
  );
}
