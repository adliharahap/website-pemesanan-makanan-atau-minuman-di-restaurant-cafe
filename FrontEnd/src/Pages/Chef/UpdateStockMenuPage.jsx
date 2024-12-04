
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveItem } from '../../redux/slices/sidebarSlice';
import { verifyToken } from '../../utils/checkUserToken';
import SidebarChef from '../../components/Chef/SidebarChef';
import NavbarAdmin from '../../components/Admin/NavbarAdmin';
import { AnimatePresence } from 'framer-motion';
import { IoHome } from 'react-icons/io5';
import MenuStockManagement from '../../components/Chef/MenuStockManagement';
import LightLogo from '../../assets/Logo/light_logo-removebg-preview.png';

const UpdateStockMenuPage = () => {
    const userData = useSelector((state) => state.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Update Stock Menu"));
        
        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role !== "chef") {
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
                <SidebarChef />
            </AnimatePresence>

            {/* navbar */}
            <NavbarAdmin />
            
            {/* body */}
            <div className='min-h-14 w-full mt-16 flex items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                    <IoHome />
                    <h1 className="font-Poppins text-sm font-semibold  text-black">Menu</h1>
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
                <MenuStockManagement />
            </div>
        </div>
    );
}

export default UpdateStockMenuPage;