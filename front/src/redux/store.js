import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice';
import featuredSlice from './slices/featuredSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        featuredProducts: featuredSlice,
    }
});


export default store;