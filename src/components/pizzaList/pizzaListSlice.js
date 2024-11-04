import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "../../services/pizzasApi";

const initialState = {
  items: [],
  status: 'idle'
};

const pizzaListSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = []; 
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setPizzas } = pizzaListSlice.actions;
export default pizzaListSlice.reducer;
