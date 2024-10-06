import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const ChangedRoleUserModal = ({ isOpen, onClose, user, getAllDatauser }) => {
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        if (user) {
            setNewRole(user.role);
        }
    }, [user]);

    const handleRoleChange = (event) => {
        setNewRole(event.target.value);
    };

    const handleSave = () => {
        if (user) {
            Swal.fire({
                title: 'Konfirmasi Perubahan Role',
                text: `Apakah Anda yakin ingin mengubah role ${user.username} menjadi "${newRole}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, ubah!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    updateRoleUser();
                }
            });
        }
    };

    const updateRoleUser = async () => {
        try {
            const userId = user.user_id;
            const EditRoleUserData = {userId, newRole};
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3001/api/users/admin/edit-role-user', EditRoleUserData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Menambahkan token di header
                },
            });

            if (response) {
                // Simpan data perubahan role di sini
                Swal.fire('Berhasil!', 'Role pengguna berhasil diubah.', 'success');
                getAllDatauser();
                onClose();
            }else {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Role Pengguna Gagal di update',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                onClose();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response ? error.response.data.message : 'Terjadi kesalahan!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    if (!user) {
        return null; // Jika user null, jangan tampilkan modal
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-96 bg-white rounded-2xl p-10 shadow-2xl relative"
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                            Ubah Role Pengguna
                        </h2>

                        <div className="flex flex-col items-center mb-8">

                            <p className="text-sm text-gray-500">
                                Username: <strong>{user.username}</strong>
                            </p>
                            {/* Menambahkan email pengguna */}
                            <p className="text-sm text-gray-500">
                                Email: <strong>{user.email}</strong>
                            </p>
                            <p className="text-sm text-gray-500">
                                Role Saat Ini: <strong>{user.role}</strong>
                            </p>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-3 text-gray-600">
                                Role Baru:
                            </label>
                            <select
                                value={newRole}
                                onChange={handleRoleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="chef">Chef</option>
                                <option value="cashier">Cashier</option>
                                <option value="waiter">Waiter</option>
                            </select>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                                onClick={onClose}
                            >
                                Batal
                            </button>
                            <motion.button
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                onClick={handleSave}
                            >
                                Simpan
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChangedRoleUserModal;
