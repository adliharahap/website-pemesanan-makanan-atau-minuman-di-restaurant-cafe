import React, { lazy, Suspense, useEffect, useState } from 'react';
import { MdMenuBook, MdFoodBank } from "react-icons/md";
import axios from 'axios';

const MenuList = lazy(() => import('./MenuList'));

const MenuStockManagement = () => {
    const [allMenu, setAllMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllMenu();
    }, []);

    const getAllMenu = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/get-all-menu');
            if (response.data && response.data.success) {
                setAllMenu(response.data.data);
            } else {
                console.error("Data tidak sesuai:", response.data);
            }
        } catch (error) {
            console.log('gagal mendapatkan menu : ', error);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    

    const renderMenuSection = (type) => {

        return(
            <div className='w-full relative mb-5 flex justify-center items-center px-4'>
                <div className='w-full h-auto border border-black rounded-md'>
                    <div className='w-full'>
                        <div className='flex items-center px-3 py-4'>
                            <MdFoodBank />
                            <h1 className='font-Poppins text-[14px] font-semibold text-black'>{type}</h1>
                        </div>
                    </div>
                    <div className='h-full w-full flex justify-center items-center flex-row flex-wrap'>
                        <Suspense fallback={<div>Loading...</div>}>
                            {allMenu.filter(item => item.Type === type).map(menu => (
                                <MenuList key={menu.menu_id} menu={menu} getAllMenu={getAllMenu} />
                            ))}
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    };

    const renderFilteredMenuSection = () => {
        const filteredMenus = allMenu.filter(item => 
            (
                (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || // Mencari berdasarkan nama
                (item.stock && item.stock.toLowerCase().includes(searchTerm.toLowerCase())) || // Mencari berdasarkan stok
                (item.price && item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())) // Mencari berdasarkan harga
            )
        );
    
        return (
            <div className='w-full relative mb-5 flex justify-center items-center px-4'>
                <div className='w-full h-auto border border-black rounded-md'>
                    <div className='w-full'>
                        <div className='flex items-center px-3 py-4'>
                            <MdFoodBank />
                            <h1 className='font-Poppins text-[14px] font-semibold text-black'>Hasil Pencarian Menu</h1>
                        </div>
                    </div>
                    <div className='h-full w-full flex justify-center items-center flex-row flex-wrap'>
                        <Suspense fallback={<div>Loading...</div>}>
                            {filteredMenus.length > 0 ? (
                                filteredMenus.map(menu => (
                                    <MenuList key={menu.menu_id} menu={menu} getAllMenu={getAllMenu} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500">Tidak ada menu yang cocok.</div> // Pesan jika tidak ada hasil
                            )}
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    };
    

    return (
        <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow'>
            <div className='w-full py-3 flex flex-col sm:flex-row sm: justify-between px-4'>
                <div className='flex items-center gap-3 pb-5'>
                    <MdMenuBook />
                    <p className='font-Poppins text-[16px] font-semibold'>Daftar Semua Menu</p>
                </div>
                <div className='flex gap-4 justify-end'>
                    <div>
                        <input className='w-40 sm:w-60 py-2 px-3 border border-gray-400 rounded-md font-Poppins text-sm' placeholder='Cari Menu' type="search" name="search" id="search" onChange={handleSearchChange} />
                    </div>
                </div>
            </div>
            {!searchTerm ? (
                <>
                    {renderMenuSection('Makanan')}
                    {renderMenuSection('Minuman')}
                </>
            ): (
                <>
                {renderFilteredMenuSection()}
                </>
            )}
        </div>
    );
};

export default MenuStockManagement;