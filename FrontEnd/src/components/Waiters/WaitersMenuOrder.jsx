import React, { lazy, Suspense, useEffect, useState } from 'react';
import { MdMenuBook, MdFoodBank } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsBasket2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa'; 
import { resetOrder } from '../../redux/slices/OrderSlice';
import { clearOrderItems } from '../../redux/slices/OrderItemsSlice';

const MenuListOrder = lazy(() => import('../Waiters/MenuListOrder'));

const WaitersMenuOrder = () => {
    const [allMenu, setAllMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const OrderItemsData = useSelector((state) => state.orderItems.items.length);
    const navigation = useNavigate();
    const dispatch = useDispatch();

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
                                <MenuListOrder key={menu.menu_id} menu={menu} getAllMenu={getAllMenu} />
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
                                    <MenuListOrder key={menu.menu_id} menu={menu} getAllMenu={getAllMenu} />
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
        <>
        <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow overflow-hidden'>
            <div className='w-full py-3 flex flex-col medium:flex-row sm:justify-between px-4'>
                <div className='flex items-center gap-3 pb-5'>
                    <MdMenuBook />
                    <p className='font-Poppins text-[16px] font-semibold'>Daftar Semua Menu</p>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 justify-end'>
                    <div className='h-full flex justify-center items-center py-1'>
                        <input className='w-[90%] sm:w-60 py-2 border border-gray-400 rounded-md font-Poppins text-sm px-2' placeholder='Cari Menu' type="search" name="search" id="search" onChange={handleSearchChange} />
                    </div>
                    <div className='h-full flex justify-center items-center py-1 gap-3'>
                        <div 
                            onClick={() => {dispatch(resetOrder()); dispatch(clearOrderItems());}} 
                            className='bg-black px-6 py-2 rounded-md flex justify-center items-center border-2 border-slate-400 relative cursor-pointer hover:scale-110 duration-300'
                        >
                            <FaTrash className='text-white mr-2' />
                            <p className='text-[10px] font-Poppins text-white font-semibold'>Delete Order</p>
                        </div>
                        <div onClick={() => navigation('/Waiter/Daftar-Keranjang')} className='bg-black px-6 py-2 rounded-md flex justify-center items-center border-2 border-slate-400 relative cursor-pointer hover:scale-110 duration-300'>
                            <div className='absolute h-5 w-5 rounded-full bg-red-500 flex justify-center items-center -top-1.5 -right-1.5'>
                                <p className='text-[10px] font-Poppins text-white'>{OrderItemsData}</p>
                            </div>
                            <BsBasket2Fill color='#fff' />
                        </div>
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
        </>
    );
};

export default WaitersMenuOrder;