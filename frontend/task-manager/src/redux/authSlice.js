import { createSlice } from "@reduxjs/toolkit";

const authReducerSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
    },

    reducers: {

        loginAction: (state, action) => {
            state.currentUser = action.payload;
        },

        logoutAction: (state) => {
            state.currentUser = null
        },
    },
});

export const {
    loginAction,
    logoutAction,
} = authReducerSlice.actions;

export default authReducerSlice.reducer;
export const authSelector = state => state.authReducer