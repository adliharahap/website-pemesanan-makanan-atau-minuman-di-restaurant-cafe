import Hamburger from 'hamburger-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar } from '../../redux/slices/admin/NavbarOpenSlice';

const NavbarAdmin = () => {
    const isNavbarOn = useSelector((state) => state.NavbarOpen.isNavbarOn);
    const userData = useSelector((state) => state.userData);

    function getGreeting() {
        const now = new Date(); // Mendapatkan waktu saat ini
        const hour = now.getHours(); // Mendapatkan jam dari waktu saat ini
    
        if (hour >= 5 && hour < 12) {
            return "Selamat Pagi";
        } else if (hour >= 12 && hour < 15) {
            return "Selamat Siang";
        } else if (hour >= 15 && hour < 19) {
            return "Selamat Sore";
        } else {
            return "Selamat Malam";
        }
    }

    function getFormattedDate() {
        const now = new Date();
    
        const day = String(now.getDate()).padStart(2, '0'); // Mendapatkan tanggal (02)
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const month = monthNames[now.getMonth()]; // Mendapatkan bulan (Oktober)
        const year = now.getFullYear(); // Mendapatkan tahun (2024)
    
        return `${day} ${month} ${year}`;
    }

    const dispatch = useDispatch();
    return (
        <div className='h-16 w-full bg-white flex fixed z-20 top-0 shadow-sm'>
            <div className='h-full w-12 flex justify-center items-center'>
                <Hamburger toggled={isNavbarOn} toggle={() => dispatch(toggleNavbar())} size={25} />
            </div>
            <div className='h-full w-auto flex justify-center items-center px-3'>
                <div>
                    <p className='text-[12px] font-Poppins font-bold'>{getGreeting()}</p>
                    <p className='text-[12px] font-Poppins font-medium'>{getFormattedDate()}</p>
                </div>
            </div>
            <div className='h-full flex flex-1 justify-end items-center px-3'>
                <div>
                    <p className='text-[12px] font-Poppins font-normal text-right'>{userData.username}</p>
                    <p className='text-[12px] font-Poppins font-normal text-right text-green-500'>{userData.role}</p>
                </div>
                <div className='h-full pl-2 flex justify-center items-center'>
                    <img className='h-8 w-8 rounded-full' src="https://44.media.tumblr.com/5afd0684dc9224a9d5e357caf6c1b709/tumblr_obxllnXppg1u8kenho4_1280.gif" alt="profiles" />
                </div>
            </div>
        </div>
    );
};

export default NavbarAdmin;