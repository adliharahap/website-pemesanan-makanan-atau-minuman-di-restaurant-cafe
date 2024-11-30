import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PendapatanBulananChart = ({ dataPendapatan }) => {
  // Format data dari response yang diberikan
  const formattedData = dataPendapatan.pendapatan_harian.map(item => ({
    tanggal: new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric' }),
    total_pendapatan: item.total_pendapatan
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tanggal" />
          <YAxis />
          <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="total_pendapatan" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PendapatanBulananChart;
