import { create } from "zustand";
import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userAddress: address,
      userLatitude: latitude,
      userLongitude: longitude,
    }));
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationAddress: address,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
