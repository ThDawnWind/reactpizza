import { configureStore } from '@reduxjs/toolkit';

import pizzas from '../components/pizzaList/pizzaListSlice';
import categoryFilter from '../components/categories/categoryFilterSlice';
import cart from '../pages/cart/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        pizzas,
        categoryFilter,
        cart},
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default  store;