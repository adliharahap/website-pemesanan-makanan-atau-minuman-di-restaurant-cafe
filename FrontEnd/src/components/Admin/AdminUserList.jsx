import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserLarge } from "react-icons/fa6";
import axios from 'axios';
import ChangedRoleUserModal from './ChangedRoleUserModal';
import Swal from 'sweetalert2';

const AdminUserList = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

  useEffect(() => {
    getAllDatauser();
  }, []);

  const getAllDatauser = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:3001/api/users/admin/get-all-users', {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token di header
        },
      });

      if (response) {
        setDataUsers(response.data.data);
        setFilteredUsers(response.data.data); // Initialize filteredUsers with all users
      }
    } catch (error) {
      console.log("Gagal mendapatkan data user: ", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = dataUsers.filter((user) => {
      return (
        user.user_id.toString().includes(value) ||
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value) ||
        new Date(user.created_at).toLocaleDateString("id-ID").includes(value)
      );
    });

    setFilteredUsers(filtered);
  };

  const deleteUser = async (user) => {
      try {
          Swal.fire({
              title: 'Konfirmasi Penghapusan Pengguna',
              text: `Apakah Anda yakin ingin menghapus pengguna ${user.username} ?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ya, hapus!',
              cancelButtonText: 'Batal'
          }).then(async (result) => {
              if (result.isConfirmed) {

                  const token = localStorage.getItem('token');
                  const userId = user.user_id;
                  const response = await axios.post('http://localhost:3001/api/users/admin/delete-user', {userId}, {
                      headers: {
                          Authorization: `Bearer ${token}`, // Menambahkan token di header
                      },
                  });

                  if (response) {
                      Swal.fire({
                          title: 'Sukses!',
                          text: 'berhasil Menghapus Pengguna',
                          icon: 'success',
                          confirmButtonText: 'OK',
                      }).then((result) => {
                          if (result.isConfirmed) {
                              getAllDatauser();
                          }
                      });
                  }else {
                      Swal.fire({
                          title: 'Gagal!',
                          text: 'Gagal Menghapus Pengguna',
                          icon: 'error',
                          confirmButtonText: 'Coba Lagi',
                      });
                  }
              }
          });
      } catch (error) {
          Swal.fire({
              title: 'Gagal!',
              text: 'Terjadi Kesalahan',
              icon: 'error',
              confirmButtonText: 'OK',
          });
      }
  }

  return (
    <>
    <ChangedRoleUserModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      user={selectedUser}
      getAllDatauser={getAllDatauser}
    />
    <motion.div
      className="w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-4 shadow overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex gap-3 '>
          <FaUserLarge size={16} />
          <h2 className="text-sm font-bold mb-6 text-center font-poppins">Daftar Pengguna</h2>
        </div>
        <div className='flex justify-end w-full mb-6 sm:w-auto'>
          <input
            className='w-44 sm:w-60 py-2 px-3 border border-gray-400 rounded-md font-Poppins text-sm outline-none focus:border-blue-300 focus:border-[1.2px]'
            placeholder='Cari Pengguna'
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          />
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
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.user_id}
                className={`${index % 2 === 0 ? "bg-green-50" : "bg-slate-50"} border-b`}
                whileHover={{ scale: 1.02, backgroundColor: "#e0e0e0" }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-4">{user.user_id}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  {new Date(user.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="p-4 flex">
                  <button
                    className="mr-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleOpenModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                    onClick={() => deleteUser(user)}
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
    </>
  );
};

export default AdminUserList;
