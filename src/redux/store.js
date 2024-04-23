import { configureStore } from "@reduxjs/toolkit";
import { ticketsReducer } from "./reducer/ticketsSlice";

export const storeAviasales = configureStore({
  reducer: {
    ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});