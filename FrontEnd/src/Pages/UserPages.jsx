import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import SidebarWaiter from '../components/Waiters/SidebarWaiter';
import NavbarAdmin from '../components/Admin/NavbarAdmin';
import { setActiveItem } from '../redux/slices/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../utils/checkUserToken';
import { useNavigate } from 'react-router-dom';

const UserPages = () => {
    const userData = useSelector((state) => state.userData);
    const [data, setdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
    const [isPayment, setIsPayment] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Konfirmasi Pesanan"));
    
        const checkLoginOrNot = async () => {
          const token = localStorage.getItem("token");
    
          if (token) {
            const isValid = await verifyToken(token, dispatch);
            if (isValid) {
              if (userData && userData.role) {
                if (userData.role !== "user") {
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
    return (
        <div className='h-screen w-full bg-slate-100 flex justify-center items-center'>
            <AnimatePresence>
            <SidebarWaiter />    
            <NavbarAdmin />
            </AnimatePresence>
            <div className=' h-44 w-[90%] bg-[#FFF5A1] flex justify-center items-center px-3 rounded-md'>
                <p className='text-justify font-Poppins font-medium'>Anda belum Mendapatkan Izin Dari admin Untuk sekarang ini, Harap Menunggu konfirmasi dari admin</p>
            </div>
        </div>
    );
};

export default UserPages;