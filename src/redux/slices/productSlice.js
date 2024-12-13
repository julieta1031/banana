import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


// fullfiled - chisht zapros  try-i mejin@
// rejected - sxal zapros  catch-i mejin@
// pending - zapros-i patasxan spaselu rejim

export const getProducts = createAsyncThunk(
    "products/get",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:5000/products")
            return response.data
        }catch (e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteProducts = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/products/${id}`)
            return response.data
        } catch (e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
        loading: false,
        error: ''
    },
    reducers:{
        // deleteProducts:(state,action) => {
        //     state.products = state.products.filter(p => p.id !== action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder
            // fullfiled - chisht zapros  try-i mejin@
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = ''
            })
            // pending - zapros-i patasxan spaselu rejim
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            // rejected - sxal zapros  catch-i mejin@
            .addCase(getProducts.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload.id)
            })
    }
})


// export const {deleteProducts} = productSlice.actions
export default productSlice.reducer