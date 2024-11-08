import React, { Suspense, useEffect, useState } from 'react';
import { verifyToken } from '../../utils/checkUserToken';
import SidebarWaiter from '../../components/Waiters/SidebarWaiter';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import NavbarAdmin from '../../components/Admin/NavbarAdmin';
import { setActiveItem } from '../../redux/slices/sidebarSlice';
import { MdTableRestaurant } from 'react-icons/md';
import axios from 'axios';
import LightLogo from '../../assets/Logo/light_logo-removebg-preview.png';
import { IoFastFood } from 'react-icons/io5';
import WaitersMenuOrder from '../../components/Waiters/WaitersMenuOrder';
import { setNoTable, setTableId, setWaitersId } from '../../redux/slices/OrderSlice';
import ListMejaOrder from '../../components/Waiters/ListMejaOrder';

const WaitersNewOrderPages = () => {
    const userData = useSelector((state) => state.userData);
    const pilihanMeja = useSelector((state) => state.order.table_id);
    const NoMeja = useSelector((state) => state.order.no_meja);

    const [allTable, setAllTable] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan input pencarian

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("Add New Order"));

        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role !== "waiter") {
                            navigate('/AccesDecline');
                        }
                    } else {
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

    useEffect(() => {
        getAllDataTable();
    }, []);

    const getAllDataTable = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/get-all-table-data');
            if (response.data && response.data.success) {
                setAllTable(response.data.data);
            } else {
                console.error("Data tidak sesuai:", response.data);
            }
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
        setTimeout(() => {
            getAllDataTable(); 
        }, 3000);
    }

    const PilihMeja = (idMeja, status, noMeja) => {
        dispatch(setTableId(idMeja));
        dispatch(setWaitersId(userData.id));
        dispatch(setNoTable(noMeja));
        console.log('id meja : ', idMeja, 'status : ', status, 'userDataid : ', userData.id);
    };

    const renderMenuSection = () => {
        // Filter meja berdasarkan pencarian
        const filteredTables = allTable.filter(meja => 
            meja.table_number.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Suspense fallback={<div>Loading...</div>}>
                {filteredTables.map(meja => (
                    <ListMejaOrder key={meja.table_id} noMeja={meja.table_number} seats={meja.seats} status={meja.status} clicked={() => PilihMeja(meja.table_id, meja.status, meja.table_number)} />
                ))}
            </Suspense>
        );
    };

    return (
        <>
            <div className='min-h-screen min-w-full bg-slate-100 relative'>
                {/* Sidebar */}
                <AnimatePresence>
                    <SidebarWaiter />
                </AnimatePresence>

                {/* navbar */}
                <NavbarAdmin />
                
                {/* body */}
                <div className='min-h-14 w-full mt-16 flex items-center justify-between px-4'>
                    <div className='flex items-center gap-2'>
                        <IoFastFood />
                        <h1 className="font-Poppins text-sm font-semibold text-black">New Order {NoMeja && (<span className='py-1 px-2 bg-green-400 rounded-full text-[13px] text-white'>Pesanan Meja No {NoMeja}</span>)}</h1>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div>
                            <img className='h-8 w-8' src={LightLogo} alt='company_logo' />
                        </div>
                        <div>
                            <h1 className="font-Playwrite text-[10px] text-green-500">King Coffee</h1>
                        </div>
                    </div>
                </div>
                {!pilihanMeja ? (
                    <div className='h-auto w-full flex flex-col justify-center items-center'>
                        <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow overflow-hidden'>
                            <div className='w-full py-3 flex flex-col sm:flex-row sm:justify-between px-4'>
                                <div className='flex items-center gap-3 pb-5'>
                                    <MdTableRestaurant />
                                    <p className='font-Poppins text-sm font-semibold'>Pilih Meja</p>
                                </div>
                                <div className='flex gap-4 justify-end'>
                                    <div>
                                        <input 
                                            className='w-40 sm:w-60 py-2 px-3 border border-gray-400 rounded-md font-Poppins text-sm'
                                            placeholder='Cari No Meja'
                                            inputMode='numeric'
                                            type="number"
                                            name="search"
                                            id="search"
                                            value={searchTerm} // Menetapkan nilai input pencarian
                                            onChange={(e) => setSearchTerm(e.target.value)} // Memperbarui state saat input berubah
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-auto flex flex-wrap justify-around md:justify-start gap-5'>
                                {renderMenuSection()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='h-auto w-full flex flex-col justify-center items-center'>
                        <WaitersMenuOrder />
                    </div>
                )}
            </div>
        </>
    );
};

export default WaitersNewOrderPages;
