import React from 'react';
import { motion } from 'framer-motion';

const MenuList = () => {
    return (
        <motion.div
            className='w-[90%] md:w-[45%] md:mx-3 h-auto flex justify-center items-center border rounded-sm mb-5 overflow-hidden shadow-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.02, boxShadow: '0px 8px 15px rgba(0, 128, 0, 0.2)' }}
        >
            <div className='w-full h-full flex'>
                <motion.div
                    className='w-32 h-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className='h-32 w-full flex justify-center items-center'>
                        <motion.img
                            className='h-[80%] w-[80%] rounded-sm'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2vhRCw8p_AkukJw5pcRn8-6N6or54VPsMw&s"
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
                <div className='flex flex-col flex-1'>
                    <div className='h-full flex flex-1 flex-col'>
                        <motion.div
                            className='h-full w-full flex flex-col justify-center gap-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <p className='font-Poppins text-[15px] font-semibold text-black text-ellipsis whitespace-nowrap'>
                                Ayam Bakar Mas Faiz
                            </p>
                            <p className='font-Poppins text-[14px] font-semibold text-green-500 text-ellipsis whitespace-nowrap'>
                                Rp. 24.000
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className='w-full flex justify-around md:justify-end md:gap-4 md:px-4 items-center py-3'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <motion.button
                            className='py-2 px-2 sm:py-2 sm:px-3 bg-green-600 hover:bg-green-700 text-slate-100 text-[10px] sm:text-[12px] font-Poppins rounded-lg'
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            Edit Menu
                        </motion.button>
                        <motion.button
                            className='py-2 px-2 sm:py-2 sm:px-3 bg-red-600 hover:bg-red-700 text-slate-100 text-[10px] sm:text-[12px] font-Poppins rounded-lg'
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            Hapus Menu
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuList;
