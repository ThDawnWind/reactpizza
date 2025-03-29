import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "../../services/pizzasApi";
import { RootState } from "../../redux/store";

interface IPizza {
  category: number;
  description: string;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}

enum PizzaStatus {
  idle = 'idle',
  loading = 'loading',
  failed = 'failed',
  succeeded = 'succeeded',
}

type PizzasList = {
  items: IPizza[];
  status: PizzaStatus;
}

const initialState: PizzasList = {
  items: [],
  status: PizzaStatus.idle,
};

const pizzaListSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<IPizza>) => {
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = PizzaStatus.loading;
        state.items = []; 
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
        state.status = PizzaStatus.succeeded;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = PizzaStatus.failed;
      });
  }
});

export const selectPizzas = (state: RootState) => state.pizzas.items;
export const selectPizzaStatus = (state: RootState) => state.pizzas.status;
export const { setPizzas } = pizzaListSlice.actions;
export default pizzaListSlice.reducer;
