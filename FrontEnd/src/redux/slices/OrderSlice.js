import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    table_id: null,
    waiters_id: null,
    no_meja: null,
    totalPrice: 0, // Total harga dari semua item
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setTableId: (state, action) => {
            state.table_id = action.payload;
        },
        setWaitersId: (state, action) => {
            state.waiters_id = action.payload;
        },
        setNoTable: (state, action) => {
            state.no_meja = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        resetOrder: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setTableId, setWaitersId, setTotalPrice, setNoTable, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
