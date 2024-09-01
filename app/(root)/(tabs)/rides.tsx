import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useCallback } from "react";

import { BSON } from "realm";
import { useRealm, useQuery } from "@realm/react";

import { Item } from "@/models/invoice";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";

const Rides = () => {
  // const user = useUser();
  const realm = useRealm();
  const items = useQuery(Item).sorted("_id");
  const [inputText, setInputText] = useState("");

  const saveInput = () => {
    if (realm) {
      realm.write(() => {
        realm.create("Item", {
          _id: new BSON.ObjectId(),
          text: inputText,
          timestamp: new Date(),
          synced: true,
        });
      });
      setInputText("");
      console.log("Input saved to Realm");
    }
  };

  return (
    <SafeAreaView>
      <Text className="text-xl mt-10">
        Network status: {!realm.isClosed ? "Connected" : "Disconnected"}
      </Text>
      <InputField
        label="Input Item:"
        placeholder="Enter item name"
        onChangeText={setInputText}
      />
      <CustomButton title="Save" onPress={saveInput} className="mt-2" />
    </SafeAreaView>
  );
};

export default Rides;
