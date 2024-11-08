import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pesanan: [] // Array untuk menyimpan pesanan yang sudah selesai dimasak
};

const DataMenuSelesaiDimasakSlice = createSlice({
    name: 'pesananSelesaiDimasak',
    initialState,
    reducers: {
        tambahPesananSelesai: (state, action) => {
            state.pesanan.push(action.payload);
        },
        updatePesananSelesai: (state, action) => {
            const index = state.pesanan.findIndex(item => item.order_id === action.payload.order_id);
            if (index !== -1) {
                state.pesanan[index] = action.payload;
            }
        },
        hapusPesananSelesai: (state, action) => {
            state.pesanan = state.pesanan.filter(item => item.order_id !== action.payload);
        },
        bersihkanSemuaPesanan: (state) => {
            state.pesanan = [];
        },
    },
});

export const {
    tambahPesananSelesai,
    updatePesananSelesai,
    hapusPesananSelesai,
    bersihkanSemuaPesanan
} = DataMenuSelesaiDimasakSlice.actions;

export default DataMenuSelesaiDimasakSlice.reducer;