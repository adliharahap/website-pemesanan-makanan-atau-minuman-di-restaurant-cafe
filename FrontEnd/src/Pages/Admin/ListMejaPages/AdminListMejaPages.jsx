import React, { Suspense, useEffect, useState } from 'react';
import LightLogo from '../../../assets/Logo/light_logo-removebg-preview.png';
import { MdTableRestaurant } from "react-icons/md";
import { verifyToken } from '../../../utils/checkUserToken';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../../../components/Admin/SidebarAdmin';
import { AnimatePresence } from 'framer-motion';
import { setActiveItem } from '../../../redux/slices/sidebarSlice';
import NavbarAdmin from '../../../components/Admin/NavbarAdmin';
import ListMejaComponent from '../../../components/Admin/ListMejaComponent';
import axios from 'axios';
import OrderModal from '../../../components/Admin/OrderModal';

const AdminListMeja = () => {
    const userData = useSelector((state) => state.userData);
    const [allTable,setAllTable] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // mengarahkan active yang benar ke sidebar
        dispatch(setActiveItem("List Meja"));
        
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
            
        }
        setTimeout(() => {
            getAllDataTable(); 
        }, 3000);
    }

    const renderMenuSection = () => {
        // Filter meja berdasarkan pencarian
        const filteredTables = allTable.filter(meja => 
            meja.table_number.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Suspense fallback={<div>Loading...</div>}>
                {filteredTables.map(meja => (
                    <ListMejaComponent key={meja.table_id} noMeja={meja.table_number} seats={meja.seats} status={meja.status} total_price={meja.total_price} clicked={() => LihatPesananMeja(meja.table_number)} />
                ))}
            </Suspense>
        );
    };

    const LihatPesananMeja = async (IdMeja) => {
        setIsOpen(true);
        setTableNumber(IdMeja)
    }

    return (
        <div className='min-h-screen min-w-full bg-slate-100 relative'>
            {isOpen && (
                <OrderModal isOpen={isOpen} closeModal={() => setIsOpen(false)} tableNumber={tableNumber} />
            )}
            {/* Sidebar */}
            <AnimatePresence>
                <SidebarAdmin />
            </AnimatePresence>

            {/* navbar */}
            <NavbarAdmin />
            
            {/* body */}
            <div className='min-h-14 w-full mt-16 flex items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                    <MdTableRestaurant />
                    <h1 className="font-Poppins text-sm font-semibold  text-black">List Meja</h1>
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
                <div className='w-[90%] min-h-52 bg-white rounded-lg mb-5 relative p-2 shadow overflow-hidden'>
                    <div className='w-full py-3 flex flex-col sm:flex-row sm: justify-between px-4'>
                        <div className='flex items-center gap-3 pb-5'>
                            <MdTableRestaurant />
                            <p className='font-Poppins text-sm font-semibold'>Daftar Semua meja</p>
                        </div>
                        <div className='flex gap-4 justify-end'>
                            <div>
                                <button className='py-2 px-3 bg-black text-slate-100 text-[12px] font-Poppins rounded-lg' onClick={() => navigate('/Admin/Add-table')}>Add Meja Baru</button>
                            </div>
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
        </div>
    );
};

export default AdminListMeja;