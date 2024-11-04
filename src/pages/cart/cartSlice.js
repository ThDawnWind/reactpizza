import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalPrice: 0, 
  totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.count += 1; 
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        }); 
      }

      state.totalCount += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount));
    },
    removeItem(state, action) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.totalCount -= state.items[itemIndex].count;
        state.items.splice(itemIndex, 1); 
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalCount', JSON.stringify(state.totalCount));
    },
    clearCart(state) {
      state.items = [];
      state.totalCount = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalCount');
    },
    decrementItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem && existingItem.count > 1) {
        existingItem.count -= 1;
        state.totalCount -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;
