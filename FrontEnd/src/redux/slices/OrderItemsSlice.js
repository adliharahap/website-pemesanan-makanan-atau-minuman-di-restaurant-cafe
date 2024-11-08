import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array of order items
};

const orderItemsSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        addOrderItem: (state, action) => {
            state.items.push(action.payload);
        },
        updateOrderItem: (state, action) => {
            const index = state.items.findIndex(item => item.menu_id === action.payload.menu_id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeOrderItem: (state, action) => {
            state.items = state.items.filter(item => item.menu_id !== action.payload);
        },
        clearOrderItems: (state) => {
            state.items = [];
        },
    },
});

export const { addOrderItem, removeOrderItem, clearOrderItems, updateOrderItem } = orderItemsSlice.actions;
export default orderItemsSlice.reducer;
