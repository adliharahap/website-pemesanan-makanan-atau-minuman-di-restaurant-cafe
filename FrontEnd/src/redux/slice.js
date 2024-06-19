import { createSlice, configureStore } from "@reduxjs/toolkit";

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

// Konfigurasi store Redux
export const store = configureStore({
    reducer: {
        LoginModal: LoginModalSlice.reducer, // Menambahkan reducer LoginModal ke dalam store
        LoginOrRegister: LoginOrRegisterSlice.reducer, // Menambahkan reducer LoginOrRegister ke dalam store
    },
});

// Subscribe ke store untuk memantau perubahan state (opsional)
store.subscribe(() => {
    console.log("STORE CHANGED:", store.getState());
});
