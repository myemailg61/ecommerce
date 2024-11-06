import { createSlice } from '@reduxjs/toolkit'

const initialValue = []

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialValue,

    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },

        removeFromCart() { }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer