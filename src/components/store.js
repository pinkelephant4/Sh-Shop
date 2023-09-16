import { create } from 'zustand'
import data from "../components/testData";

const useZustandStore = create((set, get) => ({
    apiData : data,
    filteredData : [],
    weekOptions : [],
    yearOptions : [],

    totalSales : 0,
    wow : 0,
    targetAch : 0,

    setApiData(value) {
        set({ apiData: value });
    },

    setFilteredData(value) {
        set({ filteredData: value });
    },

    setWeekOptions(value) {
        set({ weekOptions: value });
    },

    setYearOptions(value) {
        set({ monthOptions: value });
    },

    setTotalSales(value) {
        set({ totalSales: value });
    },

    setWow(value) {
        set({ wow: value });
    },

    setTargetAch(value) {
        set({ targetAch: value });
    },



}))

export default useZustandStore;



