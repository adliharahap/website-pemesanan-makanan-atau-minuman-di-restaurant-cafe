import React, { useEffect } from 'react';
import LightLogo from '../../../assets/Logo/light_logo-removebg-preview.png';
import { FaUsersGear } from "react-icons/fa6";
import { verifyToken } from '../../../utils/checkUserToken';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../../../components/Admin/SidebarAdmin';
import { AnimatePresence } from 'framer-motion';
import { setActiveItem } from '../../../redux/slices/sidebarSlice';
import MenuManagement from '../../../components/Admin/MenuManagement';
import NavbarAdmin from '../../../components/Admin/NavbarAdmin';
import AdminUserList from '../../../components/Admin/AdminUserList';

const AdminUserPages = () => {
    const userData = useSelector((state) => state.userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Pengguna"));
        
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
                    <FaUsersGear />
                    <h1 className="font-Poppins text-sm font-semibold  text-black">Pengguna</h1>
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
                <AdminUserList />
            </div>
        </div>
    );
};

export default AdminUserPages;