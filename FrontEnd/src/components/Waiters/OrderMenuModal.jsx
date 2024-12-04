import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem, updateOrderItem } from '../../redux/slices/OrderItemsSlice';
import Swal from 'sweetalert2';


const OrderMenuModal = ({ menu, onClose}) => {
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    const dispatch = useDispatch();
    const OrderItemsData = useSelector((state) => state.orderItems);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleAddToCart = async () => {
        try {
            // Membuat objek untuk menu yang akan ditambahkan ke keranjang
            const MenuOrderitems = {
                menu_id: menu.menu_id,
                name: menu.name,
                image_url: menu.image_url,
                quantity: parseInt(quantity),
                notes: notes,
                price: menu.price,
                TotalPrice: menu.price * parseInt(quantity),
            };
    
            // Mengambil item yang sudah ada di keranjang dari Redux
            const existingItem = OrderItemsData.items.find(item => item.menu_id === menu.menu_id);
    
            if (existingItem) {
                Swal.fire({
                    title: 'Menu sudah ada di keranjang!',
                    text: 'Apakah kamu ingin meng-update quantity menu ini?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Update',
                    cancelButtonText: 'Batal'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const updatedQuantity = existingItem.quantity + parseInt(quantity);
                        const updatedTotalPrice = menu.price * updatedQuantity;
            
                        const updatedItem = {
                            ...existingItem,
                            quantity: updatedQuantity,
                            TotalPrice: updatedTotalPrice,
                        };
            
                        await dispatch(updateOrderItem(updatedItem));
            
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Quantity menu berhasil di-update.',
                            icon: 'success',
                            confirmButtonText: 'Oke'
                        });
                    } else {
                        Swal.fire({
                            title: 'Dibatalkan',
                            text: 'Update quantity dibatalkan.',
                            icon: 'info',
                            confirmButtonText: 'Oke'
                        });
                    }
                });

            } else {
                await dispatch(addOrderItem(MenuOrderitems));
            
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Menu berhasil ditambahkan ke keranjang.',
                    icon: 'success',
                    confirmButtonText: 'Oke'
                });
            }
            onClose();
        } catch (error) {
            // Tampilkan pesan error
            Swal.fire({
                title: 'Terjadi Kesalahan!',
                text: 'Terjadi error saat menambahkan menu ke keranjang.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
        }
    };
    

    return (
        <div className='h-screen w-screen bg-slate-900 bg-opacity-70 flex justify-center items-center fixed top-0 left-0 z-50'>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className='h-[80%] w-[80%] md:w-[50%] bg-white rounded-lg shadow-lg p-4 relative overflow-auto'>
                
                {/* Header */}
                <div className='flex justify-between items-center border-b pb-2'>
                    <h2 className='text-2xl font-bold text-gray-800 font-Poppins'>Café Cerita</h2>
                </div>
                
                {/* Menu Details */}
                <div className='flex flex-col items-center mt-4'>
                    <img src={menu.image_url} alt={menu.name} className='w-48 h-48 rounded-lg mb-4' />
                    <h3 className='text-xl font-semibold font-Poppins'>{menu.name}</h3>
                    <p className='text-lg text-gray-600 font-Poppins'>Rp {menu.price}</p>
                </div>

                {/* Input Section */}
                <div className='mt-6 px-4'>
                    <label className='block mb-2 text-sm font-medium text-gray-700 font-Poppins'>Catatan : </label>
                    <textarea
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-Poppins'
                        rows='3'
                        placeholder='Tambah catatan khusus (opsional)...'
                        value={notes}
                        onChange={handleNotesChange}
                    />
                    
                    <label className='block mt-4 mb-2 text-sm font-medium text-gray-700 font-Poppins'>Quantity : </label>
                    <input
                        type='number'
                        className='font-Poppins w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        min='1'
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>

                {/* Add to Cart Button */}
                <div className='flex justify-center mt-12'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-Poppins'
                        onClick={handleAddToCart}
                    >
                        Masukkan ke Keranjang
                    </motion.button>
                </div>

                {/* Close Button */}
                <button 
                    className='absolute top-5 right-5 text-gray-600 hover:text-gray-800'
                    onClick={onClose}
                >
                    <IoClose size={22} />
                </button>
            </motion.div>
        </div>
    );
};

export default OrderMenuModal;
