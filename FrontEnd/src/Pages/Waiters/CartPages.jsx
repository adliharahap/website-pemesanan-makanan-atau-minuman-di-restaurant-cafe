import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md'; // Icon Delete
import { clearOrderItems, removeOrderItem } from '../../redux/slices/OrderItemsSlice'; // Sesuaikan path reducer
import axios from 'axios';
import Swal from 'sweetalert2';
import { resetOrder } from '../../redux/slices/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils/checkUserToken';
import OrderReceiptPDF, { getFileName, OrderReceipt } from '../../components/Waiters/OrderReceiptPDF';

// Helper function to format currency to Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

const CartPages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderItems = useSelector((state) => state.orderItems.items);
    const Order = useSelector((state) => state.order);
    const userData = useSelector((state) => state.userData);

    // Menghitung total harga dari semua menu
    const totalFinalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Fungsi untuk menghapus item dari keranjang
    const handleRemoveItem = (menu_id) => {
        dispatch(removeOrderItem(menu_id));
    };

    useEffect(() => {
        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role !== "waiter") {
                            navigate('/AccesDecline');
                        }
                    }else {
                        console.log("user data not defined", userData, userData.role);
                    }
                } else {
                    console.log("Token sudah expired");
                }
            } else {
                navigate('/login');
            }
        };

        checkLoginOrNot();
    }, [navigate, userData]);

    const handleSubmitOrderBtn = async(e) => {
        try{
            const orderData = {
                table_id: Order.table_id,
                waiters_id: Order.waiters_id,
                no_meja: Order.no_meja,
                totalPrice: totalFinalPrice, 
            }

            const ListOrder = orderItems.map(item => ({
                menu_id: item.menu_id,
                quantity: item.quantity,
                notes: item.notes,
                price: item.price,
                total_price: item.TotalPrice,
            }));

            const payload = {
                orderData,
                ListOrder
            }

            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3001/api/users/Waiters/OrderMenu', payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Menambahkan token di header
                },
            });
    
            if (response) {
                // Tampilkan alert sukses
                Swal.fire({
                    title: 'Sukses!',
                    text: 'berhasil Order Menu.',
                    icon: 'success',
                    showCancelButton: true,
                    cancelButtonText: 'Selesai',
                    cancelButtonColor: 'rgb(34 197 94)',
                    confirmButtonText: 'Cetak PDF',
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        try {
                            navigate('/Waiter/NewOrder');
                            navigate('/pdf-viewer');
                            
                            // Reset state dan navigate
                            setTimeout(() => {
                                dispatch(resetOrder());
                                dispatch(clearOrderItems());
                            }, 2000);
                        } catch (error) {
                            console.log("error : ", error);   
                        }
                    }else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            title: 'Peringatan!',
                            text: 'Apakah Anda yakin tidak ingin mencetak struk? Tidak mencetak struk dapat meningkatkan risiko kebingungannya pelanggan terkait pembayaran.',
                            icon: 'warning',
                            showCancelButton: true,
                            cancelButtonText: 'Selesai',
                            confirmButtonText: 'Cetak Struk',
                        }).then(async(result) => {
                            if (result.isConfirmed) {
                                try {
                                    navigate('/Waiter/NewOrder');
                                    navigate('/pdf-viewer');
                                    
                                    // Reset state dan navigate
                                    // dispatch(resetOrder());
                                    // dispatch(clearOrderItems());
                                } catch (error) {
                                    console.log("error : ", error);   
                                }
                            }else if (result.dismiss === Swal.DismissReason.cancel) {
                                navigate('/Waiter/NewOrder');
                            
                                // Reset state dan navigate
                                dispatch(resetOrder());
                                dispatch(clearOrderItems());
                            }
                        })
                    }
                });
            } else {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Menu gagal di order.',
                    icon: 'error',
                    confirmButtonText: 'Coba Lagi',
                });
            }
        }catch(e) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Terjadi Kesalahan pada server',
                icon: 'error',
                confirmButtonText: 'Coba Lagi',
            });
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-slate-500 p-4 md:p-8 font-Poppins overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 overflow-hidden relative">
                <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">Keranjang Pesanan</h1>
                <div className='absolute top-6 right-5 bg-green-500  rounded-full shadow-sm'>
                    <p className='font-Poppins py-2 px-4 text-white font-semibold text-sm'>Meja {Order.no_meja}</p>
                </div>

                {orderItems.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>Oops, belum ada item di keranjang kamu...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* List menu di keranjang */}
                        {orderItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.image_url} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-cover rounded-md shadow-md"
                                    />
                                    <div className="space-y-1">
                                        <h2 className="font-semibold text-lg">{item.name}</h2>
                                        <p className="text-gray-600">Harga: {formatRupiah(item.price)}</p>
                                        {item.notes && (
                                            <p className="text-gray-500 italic">Catatan: {item.notes}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8 mt-4 sm:mt-0">
                                    <div className="text-center">
                                        <p className="text-gray-600">Qty: {item.quantity}</p>
                                        <p className="font-semibold text-gray-800">Total: {formatRupiah(item.price * item.quantity)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.menu_id)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        <MdDelete size={28} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {/* Tabel ringkasan pesanan */}
                        <div className="mt-8 overflow-auto">
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Ringkasan Pesanan</h2>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-green-500 text-white">
                                        <th className="py-3 px-6 text-left">Nama Menu</th>
                                        <th className="py-3 px-6 text-center">Quantity</th>
                                        <th className="py-3 px-6 text-right">Harga</th>
                                        <th className="py-3 px-6 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-3 px-6 text-left">{item.name}</td>
                                            <td className="py-3 px-6 text-center">{item.quantity}</td>
                                            <td className="py-3 px-6 text-right">{formatRupiah(item.price)}</td>
                                            <td className="py-3 px-6 text-right">{formatRupiah(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total Harga Akhir dan Button Order */}
                        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Total Harga Akhir :</p>
                                <p className="text-2xl font-bold text-green-500">{formatRupiah(totalFinalPrice)}</p>
                            </div>
                            <motion.button 
                                className="bg-green-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-green-600 transition duration-300 mt-4 md:mt-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmitOrderBtn}
                            >
                                Order Now
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CartPages;
