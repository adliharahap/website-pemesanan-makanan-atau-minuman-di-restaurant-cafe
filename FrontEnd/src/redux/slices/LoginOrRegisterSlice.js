import { createSlice } from "@reduxjs/toolkit";

// Slice untuk LoginOrRegister
const LoginOrRegisterSlice = createSlice({
    name: 'LoginOrRegister',
    initialState: {
        login: false,
        register: false,
    },
    reducers: {
        toggleLogin: (state, action) => {
            state.login = action.payload;
        },
        toggleRegister: (state, action) => {
            state.register = action.payload;
        },
    }
});

export const { toggleLogin, toggleRegister } = LoginOrRegisterSlice.actions;
export default LoginOrRegisterSlice.reducer;
