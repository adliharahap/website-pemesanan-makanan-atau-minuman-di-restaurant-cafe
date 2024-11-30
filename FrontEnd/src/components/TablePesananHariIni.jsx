import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const TablePesananHariIni = () => {
    const [orders, setOrders] = useState([]);
    const userData = useSelector((state) => state.userData);

    const getDataOrders = async() => {
        const idUser = userData.id;

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3001/api/users/Admin/Dashboard/PesananSaatIni',{idUser}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 204) {
                setOrders([]);
            }else {
                setOrders(response.data);
            }
        } catch (error) {
            console.log("error : ", error);
        }

        setTimeout(() => {
            getDataOrders();
        }, 10000);
    }
    useEffect(() => {
        getDataOrders();
    },[]);  

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            ID Pesanan
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            Meja
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            ID Waiter
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            Nama Waiter
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            Status
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            Total Harga
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700 font-Poppins">
                            Waktu Pemesanan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.data && (
                        <>
                        {orders.data.map((order) => (
                            <tr key={order.order_id} className={order.status === 'pending' ? 'bg-red-100' :
                                order.status === 'cooking' ? 'bg-yellow-100' :
                                order.status === 'ready' ? 'bg-green-100' :
                                order.status === 'served' ? 'bg-[#23ff448d]' :
                                'bg-gray-100'}>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{order.order_id}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{order.table_number}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{order.waiter_id}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{order.waiter_name}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{order.status}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">Rp {order.total_price.toLocaleString()}</td>
                                <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">{new Date(order.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablePesananHariIni;
