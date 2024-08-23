import { Invoice } from "@/types/type";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { realm } from "@/models/invoice"; // Adjust this import path as needed

const InvoiceCard = ({
  invoice: { vendor, bill_to, date, lineitems, total_amount },
}: {
  invoice: Invoice;
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounted-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-row items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${},${}&zoom=10&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
        </View>
      </View>

      <Text className="text-2xl">{vendor}</Text>
    </View>
  );
};

export default InvoiceCard;
