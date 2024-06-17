import { createSlice, configureStore } from "@reduxjs/toolkit";

const LoginModalSlice = createSlice({
    name: "LoginModal",
    initialState: {
        isModalOn: false
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isModalOn = !state.isModalOn;   
        }
    }
});

export const { toggleModal } = LoginModalSlice.actions; // Export action creator toggleModal

export const store = configureStore({
    reducer: {
        LoginModal: LoginModalSlice.reducer // Menggunakan reducer dari LoginModalSlice
    }
});

store.subscribe(() => {
    console.log("STORE CHANGED:", store.getState());
});
