import {createSlice} from "@reduxjs/toolkit";

const countrySlice = createSlice({
    name: "country",
    initialState:{
        countries: [
            {
                id:1,
                name:"Spain"
            },
            {
                id:2,
                name:"Armenia"
            },
            {
                id:3,
                name:"Russia"
            },
        ]
    },
    reducers:{
        save:(state, action)=>{
            const edit = state.countries.find(c=>c.id===action.payload.id)
            edit.name = action.payload.name
        },
        deleteCountry:(state, action)=>{
            state.countries = state.countries.filter(c=>c.id!==action.payload)
        },

    }
})
export const {save,deleteCountry} = countrySlice.actions
export default countrySlice.reducer