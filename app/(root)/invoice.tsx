import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ExpensLayout from "@/components/ExpensLayout";

const invoice = () => {
  return (
    <ExpensLayout>
      <Text>invoice</Text>
    </ExpensLayout>
  );
};

export default invoice;
