import { configureStore } from "@reduxjs/toolkit";
import { ticketsReducer } from "./reducer/ticketsSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});