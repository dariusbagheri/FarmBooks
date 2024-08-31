import { View, TextInput, Button, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BSON } from "realm";
import { useRealm, useQuery } from "@realm/react";

import { Item } from "@/models/invoice";

const Rides = () => {
  // const user = useUser();
  const realm = useRealm();
  const items = useQuery(Item).sorted("_id");
  const [inputText, setInputText] = useState("");

  const saveInput = () => {
    if (realm) {
      realm.write(() => {
        realm.create("Input", {
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
      <Text className="mt-10">
        Network status: {!realm.isClosed ? "Connected" : "Disconnected"}
      </Text>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Enter text"
        className="flex w-30 h-10 border mt-10"
        numberOfLines={1}
      />
      <Button title="Save" onPress={saveInput} />
    </SafeAreaView>
  );
};

export default Rides;
