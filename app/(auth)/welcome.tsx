import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/signup");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
