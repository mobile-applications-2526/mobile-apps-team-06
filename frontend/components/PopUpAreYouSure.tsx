import { useState } from "react";
import { Pressable, View, Text, Modal } from "react-native";

type Props = {
    buttonText: string;
    yesOption?: string;
    message: string;
    onAction: () => void;
}

const PopUpAreYouSure: React.FC<Props> = ({message, onAction, yesOption, buttonText}: Props) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleConfirm = () => {
        setShowPopup(false);
        onAction();
    };

    return  <View>
      {/* Button to open popup */}
      <Pressable
        onPress={() => setShowPopup(true)}
        className="w-full py-2 bg-red-500 rounded-lg active:bg-white/20"
      >
        <Text className="text-center text-white">{buttonText}</Text>
      </Pressable>

      {/* Popup Modal */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View className="w-full bg-neutral-900 rounded-xl p-6 space-y-4 border border-white/10">
            
            {/* Message */}
            <Text className="text-white text-lg text-center">
              {message}
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-between gap-3 pt-2">
              {/* Cancel */}
              <Pressable
                onPress={() => setShowPopup(false)}
                className="flex-1 py-2 rounded-lg bg-white/10 active:bg-white/20"
              >
                <Text className="text-center text-white">Cancel</Text>
              </Pressable>

              {/* Yes / Confirm */}
              <Pressable
                onPress={handleConfirm}
                className="flex-1 py-2 rounded-lg bg-red-600 active:bg-red-700"
              >
                <Text className="text-center text-white">
                  {yesOption ?? "Yes"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
}

export default PopUpAreYouSure;