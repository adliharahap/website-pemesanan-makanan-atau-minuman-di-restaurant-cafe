import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const OrderModal = ({ isOpen, closeModal, tableNumber }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrdersTable = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/users/Admin/getOrdersDataTable", { tableNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204) {
        setOrderData([]);
      } else {
        setOrderData(response.data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setError("Gagal mengambil data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersTable();
  }, [tableNumber]);

  if (!isOpen) return null; // Jika modal tidak dibuka, tidak perlu render apa-apa

  // Menghitung total harga semua pesanan
  const totalPriceAllOrders = orderData.reduce((total, order) => {
    return total + order.total_price;
  }, 0);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center font-Poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 overflow-auto"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pesanan Meja {tableNumber}</h2>
          <button onClick={closeModal} className="text-xl text-red-500">
            <FaTimes />
          </button>
        </div>

        {loading && <p>Loading...</p>} {/* Menampilkan loading saat data sedang diambil */}
        {error && <p className="text-red-500">{error}</p>} {/* Menampilkan error jika ada masalah saat ambil data */}

        {/* Jika tidak ada data pesanan */}
        {orderData.length === 0 && !loading ? (
          <p>Data pesanan tidak ditemukan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Pesanan ID</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Total Harga</th>
                  <th className="px-4 py-2 text-left">Pelayan</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.order_id} className="border-b">
                    <td className="px-4 py-2">{order.order_id}</td>
                    <td className="px-4 py-2">
                      <span className="text-green-500">
                        <FaCheckCircle className="inline mr-2" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">Rp {order.total_price.toLocaleString()}</td>
                    <td className="px-4 py-2">{order.waiter_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Daftar item pesanan */}
            {orderData.map((order) => (
              <div key={order.order_id} className="mt-4">
                <h3 className="font-semibold text-lg">Detail Pesanan ID: {order.order_id}</h3>
                <table className="min-w-full mt-2 bg-gray-100">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Menu</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Harga</th>
                      <th className="px-4 py-2 text-left">Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr key={item.order_item_id}>
                        <td className="px-4 py-2 flex items-center">
                          <img
                            src={item.menu_image_url}
                            alt={item.menu_name}
                            className="w-10 h-10 object-cover rounded-full mr-2"
                          />
                          <span>{item.menu_name}</span>
                        </td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">Rp {item.price.toLocaleString()}</td>
                        <td className="px-4 py-2">{item.notes || "Tidak ada"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <div className="mt-6 flex justify-end">
              <div className="font-semibold text-xl">
                Total Semua Pesanan: Rp {totalPriceAllOrders.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;
