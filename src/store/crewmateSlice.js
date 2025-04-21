import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { crewmateService } from '../services/crewmateService';

// Async thunks
export const fetchCrewmates = createAsyncThunk(
  'crewmates/fetchCrewmates',
  async () => {
    return await crewmateService.getCrewmates();
  }
);

export const addCrewmate = createAsyncThunk(
  'crewmates/addCrewmate',
  async (crewmate) => {
    return await crewmateService.createCrewmate(crewmate);
  }
);

export const updateCrewmate = createAsyncThunk(
  'crewmates/updateCrewmate',
  async ({ id, crewmate }) => {
    return await crewmateService.updateCrewmate(id, crewmate);
  }
);

export const deleteCrewmate = createAsyncThunk(
  'crewmates/deleteCrewmate',
  async (id) => {
    await crewmateService.deleteCrewmate(id);
    return id;
  }
);

const initialState = {
  crewmates: [],
  status: 'idle',
  error: null
};

export const crewmateSlice = createSlice({
  name: 'crewmates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch crewmates
      .addCase(fetchCrewmates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrewmates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.crewmates = action.payload;
      })
      .addCase(fetchCrewmates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add crewmate
      .addCase(addCrewmate.fulfilled, (state, action) => {
        state.crewmates.unshift(action.payload);
      })
      // Update crewmate
      .addCase(updateCrewmate.fulfilled, (state, action) => {
        const index = state.crewmates.findIndex(crewmate => crewmate.id === action.payload.id);
        if (index !== -1) {
          state.crewmates[index] = action.payload;
        }
      })
      // Delete crewmate
      .addCase(deleteCrewmate.fulfilled, (state, action) => {
        state.crewmates = state.crewmates.filter(crewmate => crewmate.id !== action.payload);
      });
  }
});

export default crewmateSlice.reducer; 