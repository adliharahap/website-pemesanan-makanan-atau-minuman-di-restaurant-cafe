import React from 'react';
import { motion } from 'framer-motion';
import { FaUserLarge } from "react-icons/fa6";

const AdminUserList = () => {
  // Contoh data pengguna
  const users = [
    { id: 1, name: 'Adli', email: 'adli@example.com', role: 'Admin', status: 'Aktif', registered: '2024-01-15' },
    { id: 2, name: 'Ayu', email: 'ayu@example.com', role: 'Chef', status: 'Nonaktif', registered: '2024-02-10' },
    { id: 3, name: 'Budi', email: 'budi@example.com', role: 'Cashier', status: 'Aktif', registered: '2024-03-05' },
  ];

  return (
    <motion.div
      className="w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-4 shadow overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex gap-3 '>
            <FaUserLarge size={16}/>
            <h2 className="text-sm font-bold mb-6 text-center font-poppins">Daftar Pengguna</h2>
        </div>
        <div className='flex justify-end w-full mb-6 sm:w-auto'>
            <input className='w-44 sm:w-60 py-2 px-3 border border-gray-400 rounded-md font-Poppins text-sm' placeholder='Cari Pengguna' type="search" name="search" id="search" />
        </div>
    </div>
    <div className='w-full overflow-x-auto sm:overflow-x-auto md:overflow-x-auto relative mb-5'>
      <motion.table
        className="min-w-full bg-white border rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <thead className="bg-gray-200 text-gray-700 font-poppins">
          <tr>
            <th className="p-4 text-left border-b-2">ID</th>
            <th className="p-4 text-left border-b-2">Username</th>
            <th className="p-4 text-left border-b-2">Email</th>
            <th className="p-4 text-left border-b-2">Role</th>
            <th className="p-4 text-left border-b-2">Created At</th>
            <th className="p-4 text-left border-b-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 font-poppins">
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-green-50' : 'bg-slate-50'} border-b`}
              whileHover={{ scale: 1.02, backgroundColor: "#e0e0e0" }}
              transition={{ duration: 0.3 }}
            >
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.registered}</td>
              <td className="p-4 flex">
                <button
                  className="mr-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      </div>
    </motion.div>
  );
};

export default AdminUserList;
