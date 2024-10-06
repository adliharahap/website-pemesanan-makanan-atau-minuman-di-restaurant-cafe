import { createSlice } from "@reduxjs/toolkit";

// Slice untuk LoginModal
const NavbarOpenSlice = createSlice({
    name: "NavbarOpen",
    initialState: {
        isNavbarOn: false,
    },
    reducers: {
        toggleNavbar: (state) => {
            state.isNavbarOn = !state.isNavbarOn;   
        }
    }
});

export const { toggleNavbar } = NavbarOpenSlice.actions;
export default NavbarOpenSlice.reducer;
