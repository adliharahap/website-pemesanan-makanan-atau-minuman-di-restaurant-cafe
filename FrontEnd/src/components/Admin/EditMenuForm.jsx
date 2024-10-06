import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LightLogo from '../../assets/Logo/light_logo-removebg-preview.png';
import axios from "axios";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";

const EditMenuForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  

  const [focused, setFocused] = useState({
    namaMenu: false,
    deskripsi: false,
    harga: false,
    imageUrl: false,
    type: false,
    stock: false,
  });
  const [namaMenu, setNamaMenu] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState("Makanan");
  const [stock, setStock] = useState("tersedia");

  useEffect(() => {
    if (state && state.menu) {
        setNamaMenu(state.menu.name);
        setDeskripsi(state.menu.description);
        setHarga(state.menu.price);
        setImageUrl(state.menu.image_url);
        setType(state.menu.Type);
        setStock(state.menu.stock);
    }
}, [state]);

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  // Menggunakan useRef untuk merujuk ke input berikutnya
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();
  const typeRef = useRef();
  const stockRef = useRef();

  // Fungsi untuk menangani ketika tombol Enter ditekan
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  const handleAddMenuSubmit = async(e) => {
    e.preventDefault();

    try {
        const menuId = state.menu.menu_id;
        const EditMenuData = {menuId ,namaMenu, deskripsi, harga, imageUrl, type, stock};
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3001/api/users/admin/edit-menu', EditMenuData, {
            headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token di header
            },
        });

        if (response) {
            // Tampilkan alert sukses
            Swal.fire({
                title: 'Sukses!',
                text: 'berhasil update Menu',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Admin/Menu');
                }
            });
        } else {
            Swal.fire({
                title: 'Gagal!',
                text: 'Menu gagal di update',
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
            Update Data Menu
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center font-poppins">
            Edit detail menu makanan atau minuman yang ingin kamu input.
        </p>
        <form onSubmit={handleAddMenuSubmit} method="POST">
          <label className="block text-gray-700 mb-1 font-poppins">
            Nama Menu
          </label>
          <input
            type="text"
            placeholder="Nama Menu"
            className={`w-full p-3 mb-4 border ${
              focused.namaMenu ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("namaMenu")}
            onBlur={() => handleBlur("namaMenu")}
            onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
            value={namaMenu}
            onChange={(e) => setNamaMenu(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">
            Deskripsi
          </label>
          <input
            type="text"
            placeholder="Deskripsi"
            ref={descriptionRef}
            className={`w-full p-3 mb-4 border ${
              focused.deskripsi ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("deskripsi")}
            onBlur={() => handleBlur("deskripsi")}
            onKeyDown={(e) => handleKeyDown(e, priceRef)}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">Harga</label>
          <input
            type="number"
            placeholder="Harga"
            ref={priceRef}
            className={`w-full p-3 mb-4 border ${
              focused.harga ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("harga")}
            onBlur={() => handleBlur("harga")}
            onKeyDown={(e) => handleKeyDown(e, imageUrlRef)}
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Image URL"
            ref={imageUrlRef}
            className={`w-full p-3 mb-4 border ${
              focused.imageUrl ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("imageUrl")}
            onBlur={() => handleBlur("imageUrl")}
            onKeyDown={(e) => handleKeyDown(e, typeRef)}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <label className="block text-gray-700 mb-1 font-poppins">Tipe</label>
          <select
            ref={typeRef}
            className={`w-full p-3 mb-4 border ${
              focused.type ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("type")}
            onBlur={() => handleBlur("type")}
            onKeyDown={(e) => handleKeyDown(e, stockRef)}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>

          <label className="block text-gray-700 mb-1 font-poppins">Stock</label>
          <select
            ref={stockRef}
            className={`w-full p-3 mb-6 border ${
              focused.stock ? "border-green-400" : "border-gray-300"
            } rounded-md font-poppins`}
            onFocus={() => handleFocus("stock")}
            onBlur={() => handleBlur("stock")}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-lime-500 text-white py-3 rounded-md font-bold font-poppins"
          >
            Update Menu
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditMenuForm;
