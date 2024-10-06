import React, { useState } from 'react';
import { MdMenuBook } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import MenuList from './MenuList';
import { useNavigate } from 'react-router-dom';


const MenuManagement = () => {

    const navigate = useNavigate();

    return (
        <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow'>
            <div className='h-12 w-full flex items-center gap-2 px-3'>
                <MdMenuBook />
                <p className="font-Poppins text-[16px] font-semibold  text-black">Daftar semua Menu</p>
            </div>
            <div className='w-full flex justify-end px-5 py-5'>
                <button className='py-2 px-3 bg-black text-slate-100 text-[12px] font-Poppins rounded-lg' onClick={() => navigate('/Admin/Add-Menu')}>Add New Menu</button>
            </div>

            {/* component makanan */}
            <div className='w-full relative mb-5 flex justify-center items-center'>
                <div className='w-full h-auto border border-black rounded-md'>
                    <div className='w-full'>
                        <div className='flex items-center px-3 py-4'>
                            <MdFoodBank />
                            <h1 className='font-Poppins text-[14px] font-semibold  text-black'>Makanan</h1>
                        </div>
                    </div>
                    <div className='h-full w-full flex flex-col justify-center items-center md:flex-row md:flex-wrap'>
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                    </div>
                </div>
            </div>

            {/* component minuman */}
            <div className='w-full relative mb-5 flex justify-center items-center'>
                <div className='w-full h-auto border border-black rounded-md'>
                    <div className='w-full'>
                        <div className='flex items-center px-3 py-4'>
                            <MdFoodBank />
                            <h1 className='font-Poppins text-[14px] font-semibold  text-black'>Minuman</h1>
                        </div>
                    </div>
                    <div className='h-full w-full flex flex-col justify-center items-center sm:flex-row sm:flex-wrap'>
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                        <MenuList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;
