import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderMenuModal from "./OrderMenuModal";
import Swal from "sweetalert2";

const MenuListOrder = ({ menu, getAllMenu }) => {
    const [showModal, setShowModal] = useState(false);
    const Navigate = useNavigate();

    const handleOrderMenu = async() => {
        try {
            if (menu.stock === "Habis") {
                Swal.fire({
                    title: 'Stock Menu Ini Sudah Habis Atau Tidak Tersedia!',
                    icon: 'error',
                    confirmButtonText: 'Oke'
                });
            }else {
                setShowModal(true);
            }
        } catch (error) {
            Swal.fire({
                title: 'Terjadi Kesalahan!',
                text: 'Terjadi error saat mencoba order.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
        }
    }

    return (
        <>
        {showModal && (
            <OrderMenuModal onClose={() => setShowModal(false)} menu={menu} />
        )}
        <motion.div
            className='w-[90%] md:w-[45%] md:mx-3 h-auto flex justify-center items-center border rounded-sm mb-5 overflow-hidden shadow-md cursor-pointer'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.02, boxShadow: '0px 8px 15px rgba(0, 128, 0, 0.2)' }}
            onClick={() => Navigate('/MenuDescription', { state: { menu } })}
        >
            <div className='w-full h-full flex'>
                <div>
                <motion.div
                    className='w-32 h-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className='h-32 w-full flex justify-center items-center'>
                        <motion.img
                            className='h-[80%] w-24 rounded-sm'
                            src={menu.image_url}
                            alt={menu.name}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='h-full flex flex-1 flex-col'>
                        <motion.div
                            className='h-full w-full flex flex-col justify-center gap-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <p className='font-Poppins text-[15px] font-semibold text-black'>
                                {menu.name} 
                            </p>
                            <p className='font-Poppins text-[14px] font-semibold text-green-500'>
                                Rp. {menu.price.toLocaleString('id-ID')} • <span className={`${menu.stock === "Tersedia" ? 'bg-green-300' : 'bg-red-300'} px-2 py-[1.5px] rounded-full text-sm text-black`}>{menu.stock}</span>
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className='w-full flex justify-end px-3 gap-2 md:gap-4 md:px-4 items-center py-3 z-10'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <motion.button
                            className='py-2 px-2 sm:py-2 sm:px-3 bg-gray-950 hover:bg-gray-900 text-slate-100 text-[10px] sm:text-[12px] font-Poppins rounded-lg'
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOrderMenu();
                            }}
                        >
                            Order Menu
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
        </>
    );
};

export default MenuListOrder;
