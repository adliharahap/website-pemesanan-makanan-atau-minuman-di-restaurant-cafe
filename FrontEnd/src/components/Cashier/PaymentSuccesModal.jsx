import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdCheckCircle, MdAttachMoney, MdPayment, MdArrowForward, MdArrowBack, MdDiscount, MdCreditCard, MdAccessTime, MdDateRange } from 'react-icons/md'; // Menambahkan ikon baru
import { useNavigate } from 'react-router-dom';

const PaymentSuccesModal = ({ isModal, setIsModal, total, discount, paidAmount, change, currentTime, CurrentDate, NoTransaksi, waiterName, NoTabel, MenuDetails, setIsPayment }) => {
  const [orderItems, setOrderItems] = useState({MenuDetails});
  const navigate = useNavigate();

  // Format IDR
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDiscountedTotal = () => {
    return total - (total * discount) / 100;
  };

  const CetakStrukTransaksi = async() => {
    try {
      const orderData = {
        paymentMethod : "cash",
        total : calculateDiscountedTotal(),
        discount,
        paidAmount,
        change,
        NoTransaksi,
        status: "complete",
        NoTabel,
      }

      localStorage.setItem('orderData', JSON.stringify(orderData));
      localStorage.setItem('orderItems', JSON.stringify(orderItems));

      navigate('/struct-Payment-pdf-viewer');

      setTimeout(() => {
        setIsModal(false);
        setIsPayment(false);
      }, 3000);
      
    } catch (error) {
        console.log("error : ", error);   
    }
  }
  

  return (
    <>
      {isModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal content */}
          <motion.div
            className="bg-white rounded-md p-8 h-[90%] text-center shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-3/5 overflow-auto"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-col items-center space-y-5">
              {/* Success Icon */}
              <MdCheckCircle className="text-green-500 text-6xl" />

              {/* Title */}
              <h2 className="text-2xl font-bold text-green-600">Pembayaran Berhasil!</h2>

              {/* Payment Summary */}
              <div className="w-full text-gray-700 text-sm my-4">
                <table className="w-full border-collapse">
                  <tbody>
                    {/* Total Price */}
                    <tr>
                      <td className="py-3 px-5 font-medium text-left border-b flex items-center">
                        <MdAttachMoney className="text-green-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Total Harga</span>
                      </td>
                      <td className="py-3 px-5 text-right border-b">
                        <span className="text-xl font-semibold text-green-700">{formatToIDR(calculateDiscountedTotal())}</span>
                      </td>
                    </tr>

                    {/* Paid Amount */}
                    <tr>
                      <td className="py-3 px-5 font-medium text-left border-b flex items-center">
                        <MdPayment className="text-blue-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Jumlah yang Dibayar</span>
                      </td>
                      <td className="py-3 px-5 text-right border-b">
                        <span className="text-xl font-semibold text-blue-700">{formatToIDR(paidAmount)}</span>
                      </td>
                    </tr>

                    {/* Change */}
                    <tr>
                      <td className="py-3 px-5 font-medium text-left border-b flex items-center">
                        <MdArrowForward className="text-red-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Kembalian</span>
                      </td>
                      <td className="py-3 px-5 text-right border-b">
                        <span className="text-xl font-semibold text-red-700">{formatToIDR(change)}</span>
                      </td>
                    </tr>

                    {/* Discount */}
                    <tr>
                      <td className="py-2 px-5 font-medium text-left border-b flex items-center">
                        <MdDiscount className="text-yellow-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Diskon</span>
                      </td>
                      <td className="py-2 px-5 text-right border-b">{discount ? discount : 0}%</td>
                    </tr>

                    {/* Payment Method */}
                    <tr>
                      <td className="py-2 px-5 font-medium text-left border-b flex items-center">
                        <MdCreditCard className="text-purple-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Metode Pembayaran</span>
                      </td>
                      <td className="py-2 px-5 text-right border-b">Cash</td>
                    </tr>

                    {/* Transaction Number */}
                    <tr>
                      <td className="py-2 px-5 font-medium text-left border-b flex items-center">
                        <MdArrowForward className="text-orange-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Nomor Transaksi</span>
                      </td>
                      <td className="py-2 px-5 text-right border-b">{NoTransaksi}</td>
                    </tr>

                    {/* Payment Time */}
                    <tr>
                      <td className="py-2 px-5 font-medium text-left border-b flex items-center">
                        <MdDateRange className="text-gray-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Tanggal Pembayaran</span>
                      </td>
                      <td className="py-2 px-5 text-right border-b">{CurrentDate}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-5 font-medium text-left border-b flex items-center">
                        <MdAccessTime className="text-gray-600 mr-2 text-xl" />
                        <span className="text-lg font-semibold">Waktu Pembayaran</span>
                      </td>
                      <td className="py-2 px-5 text-right border-b">{currentTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Print Receipt Button */}
              <button
                className="bg-blue-500 text-white rounded px-6 py-3 w-full mt-5 hover:bg-blue-600 transition-all"
                onClick={() => CetakStrukTransaksi()}
              >
                <MdPayment className="inline-block mr-2 text-xl" />
                Cetak Struk Pembayaran
              </button>

              {/* Close Button */}
              <button
                className="bg-green-500 text-white rounded px-6 py-3 w-full mt-4 hover:bg-green-600 transition-all"
                onClick={() => {
                  setIsModal(false);
                  setIsPayment(false);
                }}
              >
                Selesai
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PaymentSuccesModal;
