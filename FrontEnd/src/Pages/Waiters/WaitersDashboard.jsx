import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils/checkUserToken';
import { setActiveItem } from '../../redux/slices/sidebarSlice';
import { AnimatePresence } from 'framer-motion';
import SidebarWaiter from '../../components/Waiters/SidebarWaiter';
import NavbarAdmin from '../../components/Admin/NavbarAdmin';
import { IoHome } from 'react-icons/io5';
import { IoIosToday } from 'react-icons/io';
import TablePesananHariIni from '../../components/TablePesananHariIni';
import LightLogo from '../../assets/Logo/light_logo-removebg-preview.png';
import StatistikPesananSaatIni from '../../components/Admin/StatistikPesananSaatIni';

const WaitersDashboard = () => {
    const userData = useSelector((state) => state.userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Dashboard"));

        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role !== "waiter") {
                            navigate('/AccesDecline');
                        }
                    }else {
                        console.log("user data not defined", userData, userData.role);
                    }
                } else {
                    console.log("Token sudah expired");
                }
            } else {
                navigate('/login');
            }
        };

        checkLoginOrNot();
    }, [navigate, dispatch, userData]);

    return (
        <>
            <div className='min-h-screen min-w-full bg-slate-100 relative'>
                {/* Sidebar */}
                <AnimatePresence>
                    <SidebarWaiter />
                </AnimatePresence>

                {/* navbar */}
                <NavbarAdmin />
                <div className='min-h-14 w-full mt-16 flex items-center justify-between px-4'>
                    <div className='flex items-center gap-2'>
                        <IoHome />
                        <h1 className="font-Poppins text-sm font-semibold  text-black">Beranda</h1>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div>
                            <img className='h-8 w-8' src={LightLogo} alt='company_logo'></img>
                        </div>
                        <div>
                            <h1 className="font-Playwrite text-[10px] text-green-500">Café Cerita</h1>
                        </div>
                    </div>
                </div>
                <div className='h-auto w-full flex flex-col justify-center items-center'>
                    <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow'>
                        <div className='h-12 w-full flex items-center gap-2 px-3'>
                            <IoIosToday />
                            <p className="font-Poppins text-[16px] font-semibold  text-black">Pesanan Hari Ini</p>
                        </div>
                        <div className='w-full overflow-x-auto sm:overflow-x-auto md:overflow-x-auto relative mb-5'>
                            <TablePesananHariIni />
                        </div>
                        <div className='w-full'>
                            <StatistikPesananSaatIni />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaitersDashboard;