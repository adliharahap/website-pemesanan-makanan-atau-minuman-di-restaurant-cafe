import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveItem } from '../../redux/slices/sidebarSlice';
import { verifyToken } from '../../utils/checkUserToken';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarCashier from '../../components/Cashier/SidebarCashier';
import NavbarAdmin from '../../components/Admin/NavbarAdmin';
import { FaFilter, FaSearch } from "react-icons/fa";
import axios from 'axios';
import DetailModal from '../../components/Cashier/DetailModal';

const PenjualanHarian = () => {
    const userData = useSelector((state) => state.userData);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        daily: false,
        monthly: false,
        yearly: false,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleOpenModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveItem("Penjualan Harian"));

        const checkLoginOrNot = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid && userData.role !== "cashier") {
                    navigate("/AccessDecline");
                }
            } else {
                navigate("/login");
            }
        };

        checkLoginOrNot();
    }, [navigate, userData, dispatch]);

    const getTransaktionHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:3001/api/users/getTransaktionHistory",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.status === 200) {
                setData(response.data.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getTransaktionHistory();
    }, []);

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilter((prev) => ({ ...prev, [name]: checked }));
    };

    const filteredData = data.filter((item) => {
        if (filter.daily) {
            return new Date(item.transaction_date).toDateString() === new Date().toDateString();
        }
        if (filter.monthly) {
            return new Date(item.transaction_date).getMonth() === new Date().getMonth();
        }
        if (filter.yearly) {
            return new Date(item.transaction_date).getFullYear() === new Date().getFullYear();
        }
        return true;
    });

    const searchedData = filteredData.filter((item) => {
        const transactionDateStr = item.transaction_date ? item.transaction_date.toString().toLowerCase() : '';
    
        return (
            item.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transactionDateStr.includes(searchTerm.toLowerCase()) ||
            item.table_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <AnimatePresence>
            <motion.div
                className="min-h-screen flex bg-slate-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SidebarCashier />
                <NavbarAdmin />
                <DetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    transactionDetails={selectedTransaction}
                />
                <div className="flex flex-col flex-grow p-4 mt-20">
                    <header className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-green-600">Penjualan Harian</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </header>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold mb-2">Filter</h2>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="daily"
                                    checked={filter.daily}
                                    onChange={handleFilterChange}
                                    className="form-checkbox text-green-600"
                                />
                                <FaFilter className="text-green-500" />
                                Harian
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="monthly"
                                    checked={filter.monthly}
                                    onChange={handleFilterChange}
                                    className="form-checkbox text-green-600"
                                />
                                <FaFilter className="text-green-500" />
                                Bulanan
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="yearly"
                                    checked={filter.yearly}
                                    onChange={handleFilterChange}
                                    className="form-checkbox text-green-600"
                                />
                                <FaFilter className="text-green-500" />
                                Tahunan
                            </label>
                        </div>
                    </div>
                    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="px-4 py-2">Tanggal</th>
                                    <th className="px-4 py-2">Nomor Meja</th>
                                    <th className="px-4 py-2">Total</th>
                                    <th className="px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchedData.map((item) => (
                                    <tr key={item.transaction_id}>
                                        <td className="px-4 py-2 border">{new Date(item.transaction_date).toLocaleString()}</td>
                                        <td className="px-4 py-2 border">{item.table_number}</td>
                                        <td className="px-4 py-2 border">{item.total_amount}</td>
                                        <td className="px-4 py-2 border">
                                            <button className="text-green-500 hover:underline" onClick={() => handleOpenModal(item)}>Detail</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PenjualanHarian;
