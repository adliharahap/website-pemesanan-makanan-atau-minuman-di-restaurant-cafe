import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react'
import SidebarAdmin from '../../../components/Admin/SidebarAdmin';
import NavbarAdmin from '../../../components/Admin/NavbarAdmin';
import AddMenuForm from '../../../components/Admin/AddMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveItem } from '../../../redux/slices/sidebarSlice';
import { verifyToken } from '../../../utils/checkUserToken';

const AdminAddMenuPages = () => {
    const userData = useSelector((state) => state.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Menu"));
        
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
                <div className='flex flex-col items-center w-full'>
                    <AddMenuForm />
                </div>
            </div>
        </div>    
    );
};

export default AdminAddMenuPages;