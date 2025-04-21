import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  crewmates: [],
};

export const crewmateSlice = createSlice({
  name: 'crewmates',
  initialState,
  reducers: {
    addCrewmate: (state, action) => {
      state.crewmates.unshift({
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    updateCrewmate: (state, action) => {
      const index = state.crewmates.findIndex(crewmate => crewmate.id === action.payload.id);
      if (index !== -1) {
        state.crewmates[index] = {
          ...state.crewmates[index],
          ...action.payload,
        };
      }
    },
    deleteCrewmate: (state, action) => {
      state.crewmates = state.crewmates.filter(crewmate => crewmate.id !== action.payload);
    },
  },
});

export const { addCrewmate, updateCrewmate, deleteCrewmate } = crewmateSlice.actions;
export default crewmateSlice.reducer; 