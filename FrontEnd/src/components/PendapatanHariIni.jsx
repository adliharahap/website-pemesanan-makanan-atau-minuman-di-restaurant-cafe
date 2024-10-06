import React from 'react'

const PendapatanHariIni = () => {
    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white border border-gray-300 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Total Pendapatan Hari Ini</h2>
                    <div className="flex items-center flex-col gap-12">
                        <div className="text-4xl font-bold text-green-600 mr-4">Rp 1,500,000</div>
                        <span className="text-sm text-gray-500">(Update terakhir: 30 September 2024)</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-300 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Total Pendapatan Bulan Ini</h2>
                    <div className="flex items-center flex-col gap-12">
                        <div className="text-4xl font-bold text-green-600 mr-4">Rp 11,500,000</div>
                        <span className="text-sm text-gray-500">(Update terakhir: 30 September 2024)</span>
                    </div>
                </div>

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
                                        Jumlah Pesanan
                                    </th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-slate-200 text-left text-sm font-semibold text-gray-700">
                                        Total Pendapatan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-100">
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">1 September 2024</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">25</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">Rp 3,500,000</td>
                                </tr>
                                <tr className="bg-green-100">
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">2 September 2024</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">30</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">Rp 4,200,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendapatanHariIni;
