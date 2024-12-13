import {configureStore} from "@reduxjs/toolkit";
import countReducer from "./slices/countSlice"
import countryReducer from "./slices/countrySlice"
import productReducer from "./slices/productSlice";
import fruitReducer from "./slices/fruitSlice";

const store = configureStore({
    reducer: {
        countReducer,
        countryReducer,
        productReducer,
        fruitReducer
    }
})

export default store

