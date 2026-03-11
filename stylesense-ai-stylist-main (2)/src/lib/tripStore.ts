import { create } from "zustand";

type TripState = {
  destination: string;
  duration: string;
  weather: string;
  events: string;

  setTrip: (data: Partial<{
    destination: string;
    duration: string;
    weather: string;
    events: string;
  }>) => void;
};

export const useTripStore = create<TripState>((set) => ({
  destination: "",
  duration: "",
  weather: "",
  events: "",

  setTrip: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
