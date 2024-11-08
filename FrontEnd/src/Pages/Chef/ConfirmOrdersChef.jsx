import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/checkUserToken";
import { setActiveItem } from "../../redux/slices/sidebarSlice";
import { AnimatePresence } from "framer-motion";
import SidebarChef from "../../components/Chef/SidebarChef";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";
import { LuClipboardList } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdRestaurantMenu } from "react-icons/md";
import { IoPricetag } from "react-icons/io5";
import Swal from "sweetalert2";
import NoDataFound from "../../components/NoDataFound";

const ConfirmOrdersChef = () => {
  const userData = useSelector((state) => state.userData);
  const [data, setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleConfirmOrder = (orderId) => {
    Swal.fire({
      title: `Konfirmasi Pesanan?`,
      text: "Harap pastikan stock untuk membuat pesanan ini tersedia sebelum menekan tombol ini! Kesalahan dapat berakibat fatal bagi layanan kami dan pelanggan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, stock tersedia!",
      cancelButtonText: "cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.post(
            "http://localhost:3001/api/users/Chef/handleConfirmedOrder",
            { orderId },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token di header
              },
            }
          );

          if (response) {
            Swal.fire({
              title: "Pesanan Berhasil Dikonfirmasi",
              text: "Status pesanan telah diperbarui menjadi sedang dimasak.",
              icon: "success",
              confirmButtonText: "Oke",
            });
          } else {
            Swal.fire({
              title: "Terjadi Masalah",
              text: "Konfirmasi pesanan tidak berhasil. Silakan coba lagi.",
              icon: "error",
              confirmButtonText: "Oke",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Gagal Mengonfirmasi Pesanan",
            text: "Terjadi kesalahan dalam memproses permintaan. Pastikan koneksi internet stabil dan coba lagi.",
            icon: "error",
            confirmButtonText: "Oke",
          });
          console.log("error : ", error);
        }
      } else {
        Swal.fire({
          title: "Konfirmasi Dibatalkan",
          text: "Pesanan tidak dikonfirmasi. Pastikan untuk melakukan pengecekan stock terlebih dahulu sebelum mengkonfirmasi",
          icon: "info",
          confirmButtonText: "Oke",
        });
      }
    });
  };

  useEffect(() => {
    // mengarahkan active yang benar ke sidebar
    dispatch(setActiveItem("Konfirmasi Pesanan"));

    const checkLoginOrNot = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const isValid = await verifyToken(token, dispatch);
        if (isValid) {
          if (userData && userData.role) {
            if (userData.role !== "chef") {
              navigate("/AccesDecline");
            }
          } else {
            console.log("user data not defined", userData, userData.role);
          }
        } else {
          console.log("Token sudah expired");
        }
      } else {
        navigate("/login");
      }
    };

    checkLoginOrNot();
  }, [navigate, dispatch, userData]);

  const getConfirmOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3001/api/users/Chef/getConfirmOrders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response) {
        setdata(response.data.orders);
      }
    } catch (error) {
      console.log("error : ", error);
    }

    setTimeout(() => {
      getConfirmOrders();
    }, 3000);
  };

  useEffect(() => {
    getConfirmOrders();
  }, [dispatch]);

  const filteredData = data.filter((order) =>
    order.table_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AnimatePresence>
        <SidebarChef />
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col w-full pt-14 overflow-hidden">
        <NavbarAdmin />
        <div className="p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center font-Poppins mb-1">
              <LuClipboardList className="text-green-500 mr-2" />
              Konfirmasi Pesanan
            </h1>
          </div>

          {/* Input Pencarian */}
          <div className="mb-4 flex justify-end">
            <div className="relative">
              <input
                type="number"
                placeholder="Cari berdasarkan nomor meja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-green-300 pl-9 focus:ring-0 w-72" // Atur lebar di sini
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <GoSearch className="text-gray-500" />{" "}
                {/* Ganti dengan ikon yang sesuai */}
              </div>
            </div>
          </div>

          {data.length !== 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredData.map((order, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow relative"
                  >
                    <div className="flex items-center mb-3">
                      <MdRestaurantMenu className="text-green-500 text-2xl mr-2" />
                      <h2 className="text-xl font-semibold text-gray-700 font-Poppins">
                        Meja {order.table_number}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {order.order_items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start flex-row medium:flex-col medium:gap-3 lg:flex-row"
                        >
                          <div className="flex items-start gap-2">
                            <img
                              src={item.menu_image_url}
                              alt={item.menu_name}
                              className="w-12 h-12 rounded object-cover mr-3"
                            />
                            <div className="flex-1">
                              <p className="text-gray-600 font-semibold font-Poppins">
                                {item.menu_name} x {item.quantity}
                              </p>
                              <p className="text-sm text-gray-500 italic font-Poppins">
                                Catatan: {item.notes || "Tidak ada"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-row md:mt-0 md:flex-row md:items-end justify-end">
                            <p className="text-gray-700 font-semibold font-Poppins">
                              <IoPricetag className="inline text-green-500 mr-1" />
                              {formatToIDR(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 mb-24 sm:mb-16 md:mb-24 lg:mb-16">
                      <p className="text-gray-600 font-Poppins">
                        Waiters:{" "}
                        <span className="font-semibold">
                          {order.waiter_name}
                        </span>
                      </p>
                      <p className="text-gray-600 font-Poppins">
                        Status:{" "}
                        <span className="font-semibold">{order.status}</span>
                      </p>
                    </div>

                    <div className=" absolute bottom-0 w-full pr-8 pt-4 pb-6">
                      <div className="flex justify-between items-center w-full h-full">
                        <p className="text-lg font-semibold text-gray-700 font-Poppins">
                          Total Harga: {formatToIDR(order.total_price)}
                        </p>
                        <button
                          onClick={() => handleConfirmOrder(order.order_id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 font-Poppins"
                        >
                          <FiCheckCircle className="text-white" />
                          Konfirmasi Pesanan
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <NoDataFound message="Belum ada konfirmasi pesanan saat ini" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrdersChef;
