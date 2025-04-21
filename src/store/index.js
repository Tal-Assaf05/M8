import { configureStore } from '@reduxjs/toolkit';
import crewmateReducer from './crewmateSlice';

export const store = configureStore({
  reducer: {
    crewmates: crewmateReducer,
  },
}); 