import { motion } from "framer-motion";
import { FaMoneyBill, FaPercentage, FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import PaymentSuccesModal from "./PaymentSuccesModal";
import Swal from 'sweetalert2'
import axios from "axios";
import { useSelector } from "react-redux";

// Fungsi untuk format ke IDR
const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

const PaymentComponent = ({ orderData, setIsPayment }) => {
  const [total, setTotal] = useState(orderData.total_price); // Total harga pesanan dari data
  const [paidAmount, setPaidAmount] = useState(0); // Jumlah yang dibayar
  const [discount, setDiscount] = useState(0); // Diskon
  const [change, setChange] = useState(0); // Hasil kembalian
  const [isModal, setIsModal] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [NoTransaksi, setNoTransaksi] = useState('');

  // Fungsi untuk menghitung total harga setelah diskon
  const calculateDiscountedTotal = () => {
    return total - (total * discount) / 100;
  };

  const generateTransactionId = () => {
    const timestamp = Date.now(); // Dapatkan timestamp saat ini
    const randomNum = Math.floor(Math.random() * 900000) + 100000; // Angka 6 digit acak
    setNoTransaksi(`TX-${timestamp.toString().slice(-6)}-${randomNum}`);
    return `TX-${timestamp.toString().slice(-6)}-${randomNum}`;
  };
  


  // Fungsi untuk memproses pembayaran
  const handlePayment = () => {
    if(change < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Uang yang dibayarkan belum cukup!',
        text: `Uang yang dibayarkan: Rp ${paidAmount} | Total yang harus dibayar: Rp ${calculateDiscountedTotal()}`,
        confirmButtonText: 'Periksa Kembali'
      });
    }else {
      Swal.fire({
        icon: 'question',
        title: 'Konfirmasi Pembayaran',
        text: 'Apakah Anda yakin ingin melanjutkan pembayaran? Pembayaran yang telah dilakukan tidak dapat dibatalkan.',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya, bayar sekarang!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then(async(result) => {
        if (result.isConfirmed) {
          handlePaymentTransaktion();
        }
      });
    }
  };

  // Fungsi untuk mengubah nominal berdasarkan button
  const handleAutoComplete = (amount) => {
    setPaidAmount(amount);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    setCurrentTime(`${hours} : ${minutes} : ${seconds}`);
    return `${hours} : ${minutes} : ${seconds}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setCurrentDate(`${day} - ${month} - ${year}`);
    return `${day} - ${month} - ${year}`;
  };

  useEffect(() => {
    const discountedTotal = calculateDiscountedTotal();
    setChange(paidAmount - discountedTotal);
  }, [paidAmount, discount]);

    // Membuat salinan MenuDetails tanpa "menu_image_url"
    const sanitizedMenuDetails = orderData.order_items.map(item => {
      const { menu_image_url, ...rest } = item;  // Menghapus menu_image_url
      return rest;  // Mengembalikan objek tanpa menu_image_url
    });

  const handlePaymentTransaktion = async() => {
    try {
      const dataTransaksi = {
        paymentMethod : "cash",
        total : calculateDiscountedTotal(),
        discount,
        paidAmount,
        change,
        NoTransaksi : generateTransactionId(),
        CashierName : userData.username,
        status: "complete",
        waiterName : orderData.waiter_name,
        NoTabel : orderData.table_number,
        menuDetails : sanitizedMenuDetails,
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/api/users/cashier/transaksion', {dataTransaksi}, {
          headers: {
              Authorization: `Bearer ${token}`, // Menambahkan token di header
          },
      });
  
      if(response) {
        await getCurrentDate();
        await getCurrentTime();
        setIsModal(true);
      }
  
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Terjadi kesalahan yang tidak diketahui.";
    
        // Tampilkan SweetAlert
        Swal.fire({
          icon: 'error', // Icon untuk menampilkan status error
          title: 'Oops, terjadi kesalahan!',
          text: errorMessage, // Pesan diambil dari server
          footer: 'Silakan coba lagi atau hubungi administrator.',
        });
      } else {
        // Tangani error lainnya
        Swal.fire({
          icon: 'error',
          title: 'Oops, terjadi kesalahan!',
          text: 'Tidak dapat terhubung ke server. Pastikan koneksi Anda stabil.',
          footer: 'Silakan coba lagi nanti.',
        });
      }
    }
  }

  return (
    <>
    <PaymentSuccesModal isModal={isModal} setIsModal={setIsModal} paidAmount={paidAmount} discount={discount} change={change} total={total} currentTime={currentTime} CurrentDate={currentDate} NoTransaksi={NoTransaksi} waiterName={orderData.waiter_name} NoTabel={orderData.table_number} MenuDetails={orderData.order_items} />
    <motion.div
      className="bg-white p-8 h-auto rounded-md shadow-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Detail Order Section */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="text-xl font-semibold text-green-500 font-Poppins mb-4">
          Pembayaran Meja No {orderData.table_number}
        </h1>
        <h2 className="text-gray-600">Waiter: {orderData.waiter_name}</h2>
        <h3 className="text-gray-600 mb-4">Status: {orderData.status}</h3>
        <ul className="space-y-3">
          {orderData.order_items.map((item) => (
            <li
              key={item.order_item_id}
              className="flex items-center justify-between border-b pb-2"
            >
              <img
                src={item.menu_image_url}
                alt={item.menu_name}
                className="w-12 h-12 rounded mr-4"
              />
              <div className="flex-grow">
                <p className="font-medium">{item.menu_name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity} {item.notes && `- ${item.notes}`}
                </p>
              </div>
              <span className="font-semibold">{formatToIDR(item.price)}</span>
            </li>
          ))}
          <li className="flex justify-between font-bold border-t pt-2">
            <span>Total Harga</span>
            <span>{formatToIDR(total)}</span>
          </li>
        </ul>
      </motion.div>

      {/* Payment Section */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
          <FaMoneyBill className="mr-2 text-green-500" /> Pembayaran
        </h2>

        {/* Input Total Harga Setelah Diskon */}
        <div className="mb-3">
          <label className="block text-gray-600">Total Harga (Setelah Diskon)</label>
          <input
            type="text"
            value={formatToIDR(calculateDiscountedTotal())}
            readOnly
            className="w-full bg-gray-100 text-gray-800 p-2 rounded border"
          />
        </div>

        {/* Input Diskon */}
        <div className="mb-3">
          <label className=" text-gray-600 flex items-center">
            <FaPercentage className="mr-2" /> Diskon (%)
          </label>
          <input
            onWheel={(e) => e.target.blur()} // Nonaktifkan scroll pada mouse
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // Nonaktifkan tombol panah
              }
            }}
            type="text"
            value={discount}
            inputMode="numeric"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault(); // Mencegah karakter non-numerik
              }
            }}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Input Jumlah yang Dibayar */}
        <div className="mb-3">
          <label className="block text-gray-600">Jumlah yang Dibayar</label>
          <input
            onWheel={(e) => e.target.blur()} // Nonaktifkan scroll pada mouse
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // Nonaktifkan tombol panah
              }
            }}
            type="text"
            inputMode="numeric"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault(); // Mencegah karakter non-numerik
              }
            }}
            value={formatToIDR(paidAmount)}
            onChange={(e) => setPaidAmount(parseInt(e.target.value.replace(/\D/g, ""), 10) || 0)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Auto Complete Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
            {[10000, 20000, 50000, 75000, 100000, 200000].map((amount) => (
                <button
                    key={amount}
                    onClick={() => handleAutoComplete(amount)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded w-full"
                >
                    {formatToIDR(amount)}
                </button>
            ))}
        </div>

        {/* Hasil Kembalian */}
        <div className="mb-3">
          <label className="block text-gray-600">Kembalian</label>
          <input
            type="text"
            value={change < 0 ? "Belum cukup" : formatToIDR(change)}
            readOnly
            className="w-full bg-gray-100 text-gray-800 p-2 rounded border"
          />
        </div>

        {/* Tombol Proses Pembayaran */}
        <button
          onClick={() => handlePayment()}
          className="w-full p-2 mt-4 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
        >
          <FaCheckCircle className="mr-2" /> Proses Pembayaran
        </button>
        <button
          onClick={() => setIsPayment(false)}
          className="w-full p-2 mt-4 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
        >
          <MdCancel className="mr-2" /> Cancel
        </button>
      </motion.div>
    </motion.div>
    </>
  );
};

export default PaymentComponent;
