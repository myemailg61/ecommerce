import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
}

const featuredSlice = createSlice({
    name: 'featured',
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getFeaturedProducts.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
});

export const { fetchProducts } = featuredSlice.actions;
export default featuredSlice.reducer;

export const getFeaturedProducts = createAsyncThunk('products/get', async () => {
    const res = await axios.get("http://localhost:8000/user/featuredP")

    return res.data
})

// export function getFeaturedProducts() {
//     return async function getFeaturedProductsThunk(dispatch, getState) {
//         try {
//             const res = await axios.get("http://localhost:8000/user/featuredP")
//             //console.log(res.data)
//             //setData(res.data)
//             dispatch(fetchProducts(res.data))
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }