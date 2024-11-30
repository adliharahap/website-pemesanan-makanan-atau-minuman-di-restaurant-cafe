import React, { useEffect, useState } from "react";
import { IoIosToday } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";

const StatistikPesananSaatIni = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    cookingOrders: 0,
    readyOrders: 0,
    readyServed: 0,
  });

  const userData = useSelector((state) => state.userData);

  const getDataOrders = async () => {
    const idUser = userData.id;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/users/Admin/Dashboard/PesananSaatIni",
        { idUser },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204) {
        setOrders([]);
      } else {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }

    setTimeout(() => {
      getDataOrders();
    }, 10000);
  };

  useEffect(() => {
    getDataOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const totalOrders = orders.length;
      const completedOrders = orders.filter(
        (order) => order.status.toLowerCase() === "completed"
      ).length;
      const pendingOrders = orders.filter(
        (order) => order.status.toLowerCase() === "pending"
      ).length;
      const cookingOrders = orders.filter(
        (order) => order.status.toLowerCase() === "cooking"
      ).length;
      const readyOrders = orders.filter(
        (order) => order.status.toLowerCase() === "ready"
      ).length;
      const readyServed = orders.filter(
        (order) => order.status.toLowerCase() === "served"
      ).length;

      setStats({
        totalOrders,
        completedOrders,
        pendingOrders,
        cookingOrders,
        readyOrders,
        readyServed,
      });
    }
  }, [orders]);

  return (
    <div className="py-3 border">
      <div className="h-12 w-full flex items-center gap-2 px-3 mb-5">
        <IoIosToday />
        <p className="font-Poppins text-[16px] font-semibold text-black">
          Statistik Pesanan Saat Ini
        </p>
      </div>
      <div className="w-full h-auto">
        <div className="flex justify-between items-center flex-col gap-3 sm:flex-row">
          <div className="px-2 justify-center items-center flex flex-col gap-3">
            <h1 className="font-Poppins text-black font-semibold text-sm">
              Jumlah All Pesanan:
            </h1>
            <p className="font-Poppins text-black font-medium text-sm">
              {stats.totalOrders}
            </p>
          </div>
          <div className="px-2 justify-center items-center flex flex-col gap-3">
            <h1 className="font-Poppins text-black font-semibold text-sm">
              Pesanan Menunggu Pembayaran (served):
            </h1>
            <p className="font-Poppins text-black font-medium text-sm">
                {stats.readyServed}
            </p>
          </div>
          <div className="px-2 justify-center items-center flex flex-col gap-3">
            <h1 className="font-Poppins text-black font-semibold text-sm">
              Pesanan Dalam Proses:
            </h1>
            <div className="flex gap-3">
              <p className="font-Poppins text-black p-1 rounded-md bg-red-200 font-medium text-sm">
                Pending: {stats.pendingOrders}
              </p>
              <p className="font-Poppins text-black p-1 rounded-md bg-yellow-200  font-medium text-sm">
                Cooking: {stats.cookingOrders}
              </p>
              <p className="font-Poppins text-black p-1 rounded-md bg-green-200 font-medium text-sm">
                Ready: {stats.readyOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikPesananSaatIni;
