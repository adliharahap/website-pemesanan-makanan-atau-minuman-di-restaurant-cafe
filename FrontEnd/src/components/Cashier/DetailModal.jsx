import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaReceipt, FaUtensils } from 'react-icons/fa';

const DetailModal = ({ isOpen, onClose, transactionDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4"
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                        <FaReceipt className="text-green-500" />
                        Detail Penjualan
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Informasi Transaksi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">ID Transaksi:</span>{" "}
                                {transactionDetails.transaction_id}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Nomor Meja:</span>{" "}
                                {transactionDetails.table_number}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Tanggal:</span>{" "}
                                {new Date(transactionDetails.transaction_date).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">Metode Pembayaran:</span>{" "}
                                {transactionDetails.payment_method}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Total:</span> Rp{" "}
                                {transactionDetails.total_amount}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Status:</span>{" "}
                                {transactionDetails.status}
                            </p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Detail Pesanan
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse border border-gray-300">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-2 border">Menu</th>
                                    <th className="px-4 py-2 border">Harga</th>
                                    <th className="px-4 py-2 border">Jumlah</th>
                                    <th className="px-4 py-2 border">Catatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionDetails.menu_details &&
                                    JSON.parse(transactionDetails.menu_details).map((menu, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border flex items-center gap-2">
                                                <FaUtensils className="text-green-500" />
                                                {menu.menu_name}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                Rp {menu.price}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {menu.quantity}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {menu.notes || "-"}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Tutup
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DetailModal;
