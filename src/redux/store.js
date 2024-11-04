import { configureStore } from '@reduxjs/toolkit';

import pizzas from '../components/pizzaList/pizzaListSlice';
import categoryFilter from '../components/categories/categoryFilterSlice';
import cart from '../pages/cart/cartSlice';

const store = configureStore({
    reducer: {pizzas, categoryFilter, cart},
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;