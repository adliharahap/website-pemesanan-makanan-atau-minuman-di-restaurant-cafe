import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PendapatanBulananChart from "./Admin/PendapatanBulananChart";
import PendapatanTahunanChart from "./Admin/PendapatanTahunanChart";

const PendapatanHariIni = () => {
  const [data, setData] = useState({
    pendapatan_harian: [],
    pendapatan_bulanan: {},
  });
  const userData = useSelector((state) => state.userData);

  const getDataPenjualan = async () => {
    const idUser = userData.id;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/users/Admin/Dashboard/Pendapatan",
        { idUser },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204) {
        setData({ pendapatan_harian: [], pendapatan_bulanan: {} });
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getDataPenjualan();

    const interval = setInterval(() => {
      getDataPenjualan();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const lastDailyData =
    data.pendapatan_harian?.[data.pendapatan_harian.length - 1] || {};

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pendapatan Hari Ini */}
        <div className="bg-white border border-gray-300 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Total Pendapatan Hari Ini</h2>
          <div className="flex items-center flex-col gap-12">
            <div className="text-4xl font-bold text-green-600 mr-4">
              {lastDailyData?.total_pendapatan
                ? formatCurrency(lastDailyData.total_pendapatan)
                : "Rp 0"}
            </div>
            <span className="text-sm text-gray-500">
              (Update terakhir:{" "}
              {lastDailyData?.tanggal ? formatDate(lastDailyData.tanggal) : "-"})
            </span>
          </div>
        </div>

        {/* Pendapatan Bulanan */}
        <div className="bg-white border border-gray-300 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Total Pendapatan Bulan Ini</h2>
          <div className="flex items-center flex-col gap-12">
            <div className="text-4xl font-bold text-green-600 mr-4">
              {data.pendapatan_bulanan?.total_pendapatan_bulanan
                ? formatCurrency(data.pendapatan_bulanan.total_pendapatan_bulanan)
                : "Rp 0"}
            </div>
            <span className="text-sm text-gray-500">
              (Bulan: {data.pendapatan_bulanan?.bulan || "-"}, Tahun:{" "}
              {data.pendapatan_bulanan?.tahun || "-"})
            </span>
          </div>
        </div>

        {/* Riwayat Penjualan */}
        <div className="bg-white border border-gray-300 shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Riwayat Penjualan Sebulan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700">
                    Total Pendapatan
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.pendapatan_harian.length > 0 ? (
                  data.pendapatan_harian.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-slate-100" : "bg-green-100"}
                    >
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                        {formatDate(item.tanggal)}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                        {formatCurrency(item.total_pendapatan)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 border-b border-gray-300 text-center text-sm text-gray-800"
                    >
                      Tidak ada data pendapatan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Chart Pendapatan bulanan */}
        <div className="bg-white border border-gray-300 shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Chart Pendapatan Sebulan</h2>
          <div className="overflow-x-auto">
            <PendapatanBulananChart dataPendapatan={data} />
          </div>
        </div>
        {/* Chart Pendapatan satu tahun */}
        <div className="bg-white border border-gray-300 shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Chart Pendapatan Satu tahun</h2>
          <div className="overflow-x-auto">
            <PendapatanTahunanChart dataPendapatan={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendapatanHariIni;
