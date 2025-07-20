
import { create } from "zustand";

type RecurrenceState = {
  frequency: string;
  interval: number;
  selectedDays: string[];
  startDate: string;
  endDate: string;
  generatedDates: string[];

  setFrequency: (frequency: string) => void;
  setInterval: (interval: number) => void;
  toggleDay: (day: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setGeneratedDates: (dates: string[]) => void;

}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  frequency: "Daily",
  interval: 1,
  selectedDays: [],
  startDate: "",
  endDate: "",
  generatedDates: [],

  setFrequency: (frequency) => set({ frequency }),
  setInterval: (interval) => set({ interval }),

  toggleDay: (day) =>
    set((state) => ({
      selectedDays: state.selectedDays.includes(day)
        ? state.selectedDays.filter((d) => d !== day)
        : [...state.selectedDays, day],
    })),
    
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setGeneratedDates: (dates) => set({ generatedDates: dates }),
}));