import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action to load water intake from AsyncStorage
export const loadWaterIntake = createAsyncThunk('water/loadWaterIntake', async () => {
  try {
    const value = await AsyncStorage.getItem('waterIntake');
    return value ? parseInt(value) : 0;
  } catch (err) {
    return 0;
  }
});

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    intake: 0,
  },
  reducers: {
    addWater: (state, action) => {
      state.intake += action.payload;
    },
    resetWater: (state) => {
      state.intake = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadWaterIntake.fulfilled, (state, action) => {
      state.intake = action.payload;
    });
  },
});

export const { addWater, resetWater } = waterSlice.actions;

export default configureStore({
  reducer: {
    water: waterSlice.reducer,
  },
});
