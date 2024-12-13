import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getFruits = createAsyncThunk(
    'fruits/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/products")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addToCard = createAsyncThunk(
    'fruits/add',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/card", data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


export const changeCountInCard = createAsyncThunk(
    'fruits/change',
    async ({id, count}, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/card/${id}`, {count})
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getFruitsFromCard = createAsyncThunk(
    'card/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/card")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


const fruitSlice = createSlice({
    name: 'fruits',
    initialState: {
        fruits: [],
        card: []
    },
    extraReducers: builder => {
        builder
            .addCase(getFruits.fulfilled, (state, action) => {
                state.fruits = action.payload
            })
            .addCase(getFruitsFromCard.fulfilled, (state, action) => {
                state.card = action.payload
            })
    }
})

export default fruitSlice.reducer