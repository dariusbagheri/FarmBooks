import React from "react";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocationStore } from "@/store";
import ExpensLayout from "@/components/ExpensLayout";

const farm = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <ExpensLayout title="Farm">
      <Text className="text-2xl">You are here: {userAddress}</Text>
      <Text className="text-2xl">You are going to: {destinationAddress}</Text>
      <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/home")}>
        <Text className="text-xl mt-10">Go Back</Text>
      </TouchableOpacity>
    </ExpensLayout>
  );
};

export default farm;
