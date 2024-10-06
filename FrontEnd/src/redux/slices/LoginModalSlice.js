import { createSlice } from "@reduxjs/toolkit";

// Slice untuk LoginModal
const LoginModalSlice = createSlice({
    name: "LoginModal",
    initialState: {
        isModalOn: true,
    },
    reducers: {
        toggleModal: (state) => {
            state.isModalOn = !state.isModalOn;   
        }
    }
});

export const { toggleModal } = LoginModalSlice.actions;
export default LoginModalSlice.reducer;
