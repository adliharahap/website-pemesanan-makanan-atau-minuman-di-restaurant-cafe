import React from 'react';
import { motion } from 'framer-motion';
import { RiArmchairFill } from 'react-icons/ri';
import TableImage from '../../assets/website_image/table.png';

const ListMejaComponent = () => {
  return (
    <motion.div
      className='w-48 bg-gradient-to-br from-green-100 to-green-200 shadow-md rounded-lg border border-green-300 cursor-pointer'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 15px rgba(0, 128, 0, 0.3)' }}
    >
      <div className='w-full flex flex-col justify-center items-center py-4'>
        <p className='font-Poppins text-[16px] font-semibold text-green-900'>Meja 01</p>
        <img src={TableImage} alt="Meja Icons" className='h-16 w-16 mt-3 transform hover:scale-110 transition-all duration-300' />
      </div>
      
      <div className='w-full flex flex-col min-h-16 max-h-fit justify-center mt-6 px-3'>
        <div className='w-full flex justify-between items-center mb-4'>
          <div className='w-1/2 flex items-center gap-1'>
            <RiArmchairFill className='text-green-800' />
            <p className='font-Poppins text-sm font-medium text-green-900'>: 6 Kursi</p>
          </div>
          <div className='w-1/2 flex justify-end'>
            <motion.div
              className='bg-green-400 rounded-full py-1 px-3'
              whileHover={{ scale: 1.1, backgroundColor: '#34d399' }}
              transition={{ duration: 0.2 }}
            >
              <p className='font-Poppins text-[12px] font-medium text-white'>Tersedia</p>
            </motion.div>
          </div>
        </div>

        <div className='w-full my-4'>
          <motion.p
            className='font-Poppins text-[12px] font-medium py-2 px-4 bg-gradient-to-r from-green-400 to-green-500 rounded-lg text-white shadow-sm'
            whileHover={{ backgroundColor: '#86efac' }}
            transition={{ duration: 0.3 }}
          >
            Tagihan Terakhir: Rp 35,000
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ListMejaComponent;
