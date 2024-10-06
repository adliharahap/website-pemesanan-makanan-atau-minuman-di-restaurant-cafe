import React from 'react'

export const TablePesananHariIni = () => {
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
                            ID Pelayan
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
                    <tr className="bg-slate-100">
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">101</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">5</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">32</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">Pending</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">Rp 150,000</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">10:30 AM</td>
                    </tr>
                    <tr className="bg-green-100">
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">101</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">5</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">32</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">Pending</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">Rp 150,000</td>
                        <td className="px-6 py-4 border-b border-slate-100 text-sm text-gray-800 font-Poppins">10:30 AM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablePesananHariIni;