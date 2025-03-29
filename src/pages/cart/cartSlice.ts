import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartItems {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface ICart {
  items: ICartItems[];
  totalPrice: number | 0;
  totalCount: number | 0;
}

type AddItemPayload = Omit<ICartItems, 'count'>;

type ItemIdPayload = {
  id: number;
};

const initialState: ICart = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  totalPrice: Number(localStorage.getItem('totalPrice')) || 0,
  totalCount: Number(localStorage.getItem('totalCount')) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
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
    removeItem(state, action: PayloadAction<ItemIdPayload>) {
      const itemIndex: number = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.totalCount -= state.items[itemIndex].count;
        state.items.splice(itemIndex, 1); 
      }
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalCount');
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
    incrementItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.count += 1;
        state.totalCount += 1;
        state.totalPrice += existingItem.price;
      }
    }
  },
});

export const { addItem, removeItem, clearCart, decrementItem, incrementItem } = cartSlice.actions;

export default cartSlice.reducer;
