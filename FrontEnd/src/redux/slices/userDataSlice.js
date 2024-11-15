import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    username: '',
    email: '',
    role: '',
    isAuthenticated: false,
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.role = null;
            state.isAuthenticated = false;
            
            // Lalu reload halaman
            setTimeout(() => {
                window.location.reload();
            }, 500);
        },
    },
});

export const { setUser, logoutUser } = userDataSlice.actions;
export default userDataSlice.reducer;
