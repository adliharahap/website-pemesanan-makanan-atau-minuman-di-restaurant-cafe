import React, { useEffect } from 'react';
import LightLogo from '../../../assets/Logo/light_logo-removebg-preview.png';
import { MdTableRestaurant } from "react-icons/md";
import { verifyToken } from '../../../utils/checkUserToken';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../../../components/Admin/SidebarAdmin';
import { AnimatePresence } from 'framer-motion';
import { setActiveItem } from '../../../redux/slices/sidebarSlice';
import NavbarAdmin from '../../../components/Admin/NavbarAdmin';
import ListMejaComponent from '../../../components/Admin/ListMejaComponent';

const AdminListMeja = () => {
    const userData = useSelector((state) => state.userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("List Meja"));
        
        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role !== "admin") {
                            navigate('/AccesDecline');
                        }
                    }else {
                        console.log("user data not defined", userData, userData.role);
                    }
                } else {
                    console.log("Token sudah expired");
                    // navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkLoginOrNot();
    }, [navigate, dispatch, userData]);

    return (
        <div className='min-h-screen min-w-full bg-slate-100 relative'>
            {/* Sidebar */}
            <AnimatePresence>
                <SidebarAdmin />
            </AnimatePresence>

            {/* navbar */}
            <NavbarAdmin />
            
            {/* body */}
            <div className='min-h-14 w-full mt-16 flex items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                    <MdTableRestaurant />
                    <h1 className="font-Poppins text-sm font-semibold  text-black">List Meja</h1>
                </div>
                <div className='flex items-center justify-end'>
                    <div>
                        <img className='h-8 w-8' src={LightLogo} alt='company_logo'></img>
                    </div>
                    <div>
                        <h1 className="font-Playwrite text-[10px] text-green-500">King Cofee</h1>
                    </div>
                </div>
            </div>
            <div className='h-auto w-full flex flex-col justify-center items-center'>
                <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow overflow-hidden'>
                    <div className='w-full py-3 flex flex-col sm:flex-row sm: justify-between px-4'>
                        <div className='flex items-center gap-3 pb-5'>
                            <MdTableRestaurant />
                            <p className='font-Poppins text-sm font-semibold'>Daftar Semua meja</p>
                        </div>
                        <div className='flex gap-4 justify-end'>
                            <div>
                                <button className='py-2 px-3 bg-black text-slate-100 text-[12px] font-Poppins rounded-lg' onClick={() => navigate('/Admin/Add-Menu')}>Add Meja Baru</button>
                            </div>
                            <div>
                                <input className='w-40 sm:w-60 py-2 px-3 border border-gray-400 rounded-md font-Poppins text-sm' placeholder='Cari Meja' type="search" name="search" id="search" />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-wrap justify-around md:justify-start gap-5'>
                        <ListMejaComponent />
                        <ListMejaComponent />
                        <ListMejaComponent />
                        <ListMejaComponent />
                        <ListMejaComponent />
                        <ListMejaComponent />
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default AdminListMeja;