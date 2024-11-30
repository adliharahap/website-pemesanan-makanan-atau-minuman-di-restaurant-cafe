import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PendapatanTahunanChart = ({ dataPendapatan }) => {
  // Format data dari response yang diberikan
  const formatDataPerBulan = () => {
    const dataPerBulan = Array(12).fill(0); // 12 bulan, mulai dari Januari sampai Desember
    
    // Mengelompokkan data berdasarkan bulan
    dataPendapatan.pendapatan_harian.forEach(item => {
      const month = new Date(item.tanggal).getMonth(); // Dapatkan bulan dari tanggal (0 = Januari, 11 = Desember)
      dataPerBulan[month] += item.total_pendapatan; // Pastikan 'total_pendapatan' didefinisikan dari item
    });

    // Return data yang sudah dikelompokkan untuk setiap bulan
    return dataPerBulan.map((totalPendapatan, index) => ({
      bulan: new Date(2024, index).toLocaleString('id-ID', { month: 'long' }), // Format bulan dalam bahasa Indonesia
      total_pendapatan: totalPendapatan, // Pastikan mendefinisikan total_pendapatan dengan benar
    }));
  };

  const formattedData = formatDataPerBulan();

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="total_pendapatan" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PendapatanTahunanChart;
