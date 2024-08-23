import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { Farm } from "@/types/type";
import { icons } from "@/constants";

const FarmCard = ({
  farm: { name, address, lat, long, fileds },
}: {
  farm: Farm;
}) => {
  console.log("uri: ");
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-row items-center justify-between p-3">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=400&height=400&center=lonlat:${lat},${long}&zoom=14&pitch=50&bearing=25&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />

        <View className="flex flex-col mx-5 gap-y-5 flex-1">
          <View className="flex flex-row items-start gap-x-2">
            <Image source={icons.map} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {name}
            </Text>
          </View>

          <View className="flex flex-row items-start gap-x-2">
            <Image source={icons.point} className="w-5 h-5" />
            <Text className="text-xs font-JakartaSmall" numberOfLines={2}>
              {address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FarmCard;
