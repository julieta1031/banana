import {createSlice} from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: "count",
    initialState:{
        count: 0,
    },
    reducers: {
        plus:(state, action)=>{
            state.count = state.count + action.payload
        },
        minus: (state, action)=>{
            state.count = state.count - action.payload
        },
    }
})

export const {plus, minus} = countSlice.actions

export default countSlice.reducer