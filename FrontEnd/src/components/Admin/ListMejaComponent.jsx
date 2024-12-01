import React from 'react';
import { motion } from 'framer-motion';
import { RiArmchairFill } from 'react-icons/ri';
import TableImage from '../../assets/website_image/table.png';

const ListMejaComponent = ({noMeja, seats, status,total_price, clicked}) => {

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <motion.div
      className={`w-48 ${status === "available" ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-300' : 'bg-gradient-to-br from-red-100 to-red-200 border-red-300'} shadow-md rounded-lg border cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.05, boxShadow: `0px 10px 15px ${status === "available" ? 'rgba(0, 128, 0, 0.3)' : 'rgba(255, 0, 0,0.3)'}` }}
      onClick={clicked}
    >
      <div className='w-full flex flex-col justify-center items-center py-4'>
        <p className={`font-Poppins text-[16px] font-semibold ${status === "available" ? 'text-green-900' : 'text-red-900'}`}>Meja {noMeja}</p>
        <img src={TableImage} alt="Meja Icons" className='h-16 w-16 mt-3 transform hover:scale-110 transition-all duration-300' />
      </div>
      
      <div className='w-full flex flex-col min-h-16 max-h-fit justify-center mt-6 px-3'>
        <div className='w-full flex justify-between items-center mb-4'>
          <div className='w-1/2 flex items-center gap-1'>
            <RiArmchairFill className={`${status === "available" ? 'text-green-800' : 'text-red-800'}`} />
            <p className={`font-Poppins text-sm font-medium ${status === "available" ? 'text-green-900' : 'text-red-900'}`}>: {seats} Kursi</p>
          </div>
          <div className='w-1/2 flex justify-end'>
            <motion.div
              className={`${status === "available" ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 px-3`}
              whileHover={{ scale: 1.1, backgroundColor: ` ${status === "available" ? '#34d399' : '#d93453'}` }}
              transition={{ duration: 0.2 }}
            >
              <p className='font-Poppins text-[12px] font-medium text-white'>{status === "available" ? 'Tersedia' : 'Ditempati'}</p>
            </motion.div>
          </div>
        </div>

        <div className='w-full my-4'>
          <motion.p
            className={`font-Poppins text-[12px] font-medium py-2 px-4  ${status === "available" ? ' bg-gradient-to-r from-green-400 to-green-500' : ' bg-gradient-to-r from-red-400 to-red-500'} rounded-lg text-white shadow-sm`}
            transition={{ duration: 0.3 }}
          >
            Tagihan Terakhir: {formatCurrency(total_price)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ListMejaComponent;
