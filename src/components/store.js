import { create } from 'zustand'

export const useZustandStore = create((set, get) => ({
    apiData : [],
    filteredData : [],

    setApiData(value) {
        set({ apiData: value });
    },

    setFilteredData(value) {
        set({ filteredData: value });
    },

}))



