import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import LightLogo from '../../assets/Logo/light_logo-removebg-preview.png';
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const AddTableForm = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState({
    noMeja: false,
    jumlahKursi: false,
    mejaAvailable: false,
  });
  const [noMeja, setNoMeja] = useState('');
  const [jumlahKursi, setJumlahKursi] = useState('');
  const [mejaAvailable, setMejaAvailable] = useState("available");

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  // Menggunakan useRef untuk merujuk ke input berikutnya
  const jumlahKursiRef = useRef();
  const statusRef = useRef();

  // Fungsi untuk menangani ketika tombol Enter ditekan
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleAddTableSubmit = async (e) => {
    e.preventDefault();

    try {
        const addTableData = { noMeja, jumlahKursi, mejaAvailable };
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3001/api/users/Admin/Add-table', addTableData, {
            headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token di header
            },
        });

        if (response) {
            // Tampilkan alert sukses
            Swal.fire({
                title: 'Sukses!',
                text: 'Meja berhasil ditambahkan.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                  navigate('/Admin/List-meja');
              }
            });
        } else {
            Swal.fire({
                title: 'Gagal!',
                text: 'Meja gagal ditambahkan.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi',
            });
        }
    } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response ? error.response.data.message : 'Terjadi kesalahan!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md my-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <img src={LightLogo} alt="Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center font-poppins">
          Tambahkan Meja Baru
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center font-poppins">
          Tambahkan Detail No Meja Dan Jumlah Kursi Yang Ingin Kamu Input.
        </p>
        <form onSubmit={handleAddTableSubmit} method="POST">
          <label className="block text-gray-700 mb-1 font-poppins">
            No Meja
          </label>
          <input
            type="number"
            placeholder="Input No Meja"
            className={`w-full p-3 mb-4 border ${
              focused.noMeja ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins appearance-none`}
            onFocus={() => handleFocus("noMeja")}
            onBlur={() => handleBlur("noMeja")}
            onKeyDown={(e) => handleKeyDown(e, jumlahKursiRef)}
            value={noMeja}
            onChange={(e) => setNoMeja(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">
            Jumlah Kursi
          </label>
          <input
            type="number"
            placeholder="Input Jumlah Kursi"
            ref={jumlahKursiRef}
            className={`w-full p-3 mb-4 border ${
              focused.jumlahKursi ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins appearance-none`}
            onFocus={() => handleFocus("jumlahKursi")}
            onBlur={() => handleBlur("jumlahKursi")}
            onKeyDown={(e) => handleKeyDown(e, statusRef)}
            value={jumlahKursi}
            onChange={(e) => setJumlahKursi(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">Status</label>
          <select
            ref={statusRef}
            className={`w-full p-3 mb-6 border ${
              focused.mejaAvailable ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("mejaAvailable")}
            onBlur={() => handleBlur("mejaAvailable")}
            value={mejaAvailable}
            onChange={(e) => setMejaAvailable(e.target.value)}
          >
            <option value="available">Tersedia</option>
            <option value="occupied">Ditempati</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-lime-500 text-white py-3 rounded-md font-bold font-poppins"
          >
            Tambah Meja
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTableForm;
