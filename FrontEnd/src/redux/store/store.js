import { configureStore } from "@reduxjs/toolkit";
import LoginModalReducer from "../slices/LoginModalSlice";
import LoginOrRegisterReducer from "../slices/LoginOrRegisterSlice";
import userDataReducer from "../slices/userDataSlice";
import sidebarReducer from '../slices/sidebarSlice';
import NavbarOpenSlice from "../slices/admin/NavbarOpenSlice";
import OrderReducer from "../slices/OrderSlice";
import orderItemsReducer from '../slices/OrderItemsSlice';
import DataMenuSelesaiDimasakReducer from '../slices/DataMenuSelesaiDimasakSlice'; 

// Konfigurasi store Redux
export const store = configureStore({
    reducer: {
        LoginModal: LoginModalReducer,
        NavbarOpen: NavbarOpenSlice,
        LoginOrRegister: LoginOrRegisterReducer,
        userData: userDataReducer,
        sidebar: sidebarReducer,
        order : OrderReducer,
        orderItems: orderItemsReducer,
        DataMenuSelesaiDimasak : DataMenuSelesaiDimasakReducer,
    },
});

// Subscribe ke store untuk memantau perubahan state (opsional)
// store.subscribe(() => {
//     console.log("STORE CHANGED:", store.getState());
// });

export default store;
