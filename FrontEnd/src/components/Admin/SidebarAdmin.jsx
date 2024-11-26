import React from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdTableBar, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { motion } from "framer-motion";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../../utils/UserLogOut';
import { useNavigate } from 'react-router-dom';
import { setActiveItem } from '../../redux/slices/sidebarSlice';
import { toggleNavbar } from '../../redux/slices/admin/NavbarOpenSlice';
import { GoHistory } from 'react-icons/go';

function SidebarAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = [
        { label: 'Dashboard', icon: <MdDashboard color='#fff' />, path: '/Admin/Dashboard' },
        { label: 'Menu', icon: <MdOutlineRestaurantMenu color='#fff' />, path: '/Admin/Menu' },
        { label: 'Pengguna', icon: <FaUsers color='#fff' />, path: '/Admin/Pengguna' },
        { label: 'List Meja', icon: <MdTableBar color='#fff' />, path: '/Admin/List-meja' },
        { label: 'History Penjualan', icon: <GoHistory color='#fff' />, path: '/HistoryOrders' },
    ];

    const activeItem = useSelector((state) => state.sidebar.activeItem);
    const isNavbarOn = useSelector((state) => state.NavbarOpen.isNavbarOn);
    const userData = useSelector((state) => state.userData);

    const handleItemClick = (label, path) => {
        dispatch(setActiveItem(label));
        navigate(path);
        dispatch(toggleNavbar());
    };


    return (
        <motion.div
            className='h-screen w-52 fixed z-50 bg-[#1F1E26] top-0 left-0'
            initial={{ opacity: 0, translateX: '-100%' }}
            animate={isNavbarOn ? { opacity: 1, translateX: '0%' } : { opacity: 0, translateX: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className='h-full w-full relative'>

                {/* close component */}
                <div onClick={() => dispatch(toggleNavbar())} className='h-8 w-14 absolute top-10 -right-3 bg-purple-600 rounded-r-full rounded-l-sm cursor-pointer'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <MdKeyboardDoubleArrowLeft color='#fff' size={'24px'} />
                    </div>
                </div>

                <div className='flex flex-col py-4 justify-center items-center px-3 m-3 bg-black/15 rounded-md'>
                    <div className='h-full pl-2 flex justify-center items-center mb-5'>
                        <img className='h-20 w-20 rounded-full border-[1.5px]' src="https://44.media.tumblr.com/5afd0684dc9224a9d5e357caf6c1b709/tumblr_obxllnXppg1u8kenho4_1280.gif" alt="profiles" />
                    </div>
                    <div className='w-full text-center'>
                        <p className='text-[12px] font-Poppins font-semibold text-white'>{userData.username}</p>
                        <p className='text-[10px] font-Poppins font-medium text-green-300'>{userData.email}</p>
                    </div>
                </div>

                <div className='flex flex-col py-4 justify-center items-center my-3 rounded-md'>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleItemClick(item.label, item.path)}
                            className={`w-full h-10 mb-2 flex justify-start items-center px-4 relative overflow-hidden cursor-pointer ${activeItem === item.label ? 'bg-purple-500/10' : 'bg-transparent'}`}
                        >
                            <div className='pr-3 flex justify-center items-center h-full'>
                                {item.icon}
                            </div>
                            <div className='flex justify-center items-center h-full'>
                                <p className='text-sm font-Poppins font-medium text-white'>{item.label}</p>
                            </div>
                            {activeItem === item.label && (
                                <div className='h-[80%] w-5 rounded-md absolute top-1 -right-4 bg-purple-600'></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className='flex w-full'>
                    <div onClick={() => Logout(dispatch)} className='w-full h-10 mb-2 flex justify-start items-center px-4 relative overflow-hidden cursor-pointer hover:bg-purple-600/10'>
                        <div className='pr-3 flex justify-center items-center h-full'>
                            <BiLogOut color='#fff' />
                        </div>
                        <div className='flex justify-center items-center h-full'>
                            <p className='text-sm font-Poppins font-medium text-white'>Log out</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default SidebarAdmin;