import { ticketsReducer } from './reducer/ticketsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
