import authReducer from "./authSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth: authReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store