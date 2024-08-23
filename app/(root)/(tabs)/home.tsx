import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { FlatList, Text, View, Image, ActivityIndicator } from "react-native";

import { images } from "@/constants";
import FarmCard from "@/components/FarmCard";

const recentInvoices = [
  {
    vendor: "Green Acres Seed Supply",
    dateIssued: new Date("2024-03-15"),
    lineItems: [
      {
        description: "Corn Seeds (50lb bag)",
        quantity: 10,
        unitPrice: 150.0,
        totalPrice: 1500.0,
      },
      {
        description: "Soybean Seeds (40lb bag)",
        quantity: 8,
        unitPrice: 120.0,
        totalPrice: 960.0,
      },
      {
        description: "Wheat Seeds (60lb bag)",
        quantity: 5,
        unitPrice: 100.0,
        totalPrice: 500.0,
      },
    ],
    totalAmount: 2960.0,
  },
  {
    vendor: "Farm Tech Machinery",
    dateIssued: new Date("2024-04-02"),
    lineItems: [
      {
        description: "Tractor Maintenance Service",
        quantity: 1,
        unitPrice: 500.0,
        totalPrice: 500.0,
      },
      {
        description: "Replacement Plow Blades",
        quantity: 3,
        unitPrice: 200.0,
        totalPrice: 600.0,
      },
      {
        description: "Hydraulic Fluid (5 gal)",
        quantity: 2,
        unitPrice: 75.0,
        totalPrice: 150.0,
      },
    ],
    totalAmount: 1250.0,
  },
  {
    vendor: "Harvest Moon Irrigation Systems",
    dateIssued: new Date("2024-05-10"),
    lineItems: [
      {
        description: "Drip Irrigation Tubing (1000 ft)",
        quantity: 5,
        unitPrice: 120.0,
        totalPrice: 600.0,
      },
      {
        description: "Sprinkler Heads",
        quantity: 50,
        unitPrice: 5.0,
        totalPrice: 250.0,
      },
      {
        description: "Irrigation Controller",
        quantity: 1,
        unitPrice: 350.0,
        totalPrice: 350.0,
      },
    ],
    totalAmount: 1200.0,
  },
  {
    vendor: "Fertile Fields Fertilizer Co.",
    dateIssued: new Date("2024-06-05"),
    lineItems: [
      {
        description: "Nitrogen Fertilizer (50lb bag)",
        quantity: 20,
        unitPrice: 45.0,
        totalPrice: 900.0,
      },
      {
        description: "Phosphorus Fertilizer (40lb bag)",
        quantity: 15,
        unitPrice: 50.0,
        totalPrice: 750.0,
      },
      {
        description: "Organic Compost (1 cubic yard)",
        quantity: 10,
        unitPrice: 30.0,
        totalPrice: 300.0,
      },
    ],
    totalAmount: 1950.0,
  },
  {
    vendor: "Barnyard Builders",
    dateIssued: new Date("2024-07-20"),
    lineItems: [
      {
        description: "Silo Repair Service",
        quantity: 1,
        unitPrice: 2000.0,
        totalPrice: 2000.0,
      },
      {
        description: "Barn Door Replacement",
        quantity: 2,
        unitPrice: 500.0,
        totalPrice: 1000.0,
      },
      {
        description: "Fencing Materials (100 ft)",
        quantity: 5,
        unitPrice: 200.0,
        totalPrice: 1000.0,
      },
    ],
    totalAmount: 4000.0,
  },
];

const mockFarms = [
  {
    name: "Golden Valley Orchards",
    lat: "36.63758822441568",
    long: "-119.97674966543511",
    address: "12345 Orchard Lane, Fresno, CA 93720",
  },
  {
    name: "Sunshine Dairy Farm",
    lat: "36.51233478848877",
    long: "-119.9328900591454",
    address: "7890 Dairy Road, Merced, CA 95340",
  },
  {
    name: "Central Valley Vineyards",
    lat: "36.6066",
    long: "-120.189",
    address: "5678 Grape Avenue, Madera, CA 93637",
  },
  {
    name: "San Joaquin Almond Groves",
    lat: "36.514560434208065",
    long: "-120.02770505757796",
    address: "2468 Nut Tree Boulevard, Manteca, CA 95337",
  },
  {
    name: "Fresno Citrus Company",
    lat: "36.7468",
    long: "-119.7726",
    address: "13579 Orange Grove Road, Clovis, CA 93611",
  },
  {
    name: "Kings River Produce",
    lat: "36.4980039890023",
    long: "-119.88368019445437",
    address: "9876 Vegetable Way, Hanford, CA 93230",
  },
  {
    name: "Tulare County Cotton Fields",
    lat: "36.491054405894815",
    long: "-119.81362321312267",
    address: "1357 Cotton Lane, Visalia, CA 93277",
  },
];

export function Home() {
  const { user } = useUser();
  const loading = false;

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={mockFarms?.slice(0, 5)}
        renderItem={({ item }) => <FarmCard farm={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No Farms found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No farms found!</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text>Welcome {user?.firstName}!</Text>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default Home;
