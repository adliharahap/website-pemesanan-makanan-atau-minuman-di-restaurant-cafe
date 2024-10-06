import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MenuList = ({ menu, getAllMenu }) => {
    const Navigate = useNavigate();

    const DeleteMenuButton = async () => {
        try {
            const menuId = menu.menu_id;
            const token = localStorage.getItem('token');
    
            const response = await axios.post('http://localhost:3001/api/users/admin/delete-menu', {menuId}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Menambahkan token di header
                },
            });
    
            if (response) {
                // Tampilkan alert sukses
                Swal.fire({
                    title: 'Sukses!',
                    text: 'Berhasil Menghapus Menu',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        
                    }
                });
                getAllMenu();
            } else {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Gagal Menghapus Menu',
                    icon: 'error',
                    confirmButtonText: 'Coba Lagi',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response ? error.response.data.message : 'Terjadi kesalahan!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <motion.div
            className='w-[90%] md:w-[45%] md:mx-3 h-auto flex justify-center items-center border rounded-sm mb-5 overflow-hidden shadow-md cursor-pointer'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.02, boxShadow: '0px 8px 15px rgba(0, 128, 0, 0.2)' }}
            onClick={() => Navigate('/MenuDescription', { state: { menu } })}
        >
            <div className='w-full h-full flex'>
                <motion.div
                    className='w-32 h-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className='h-32 w-full flex justify-center items-center'>
                        <motion.img
                            className='h-[80%] w-24 rounded-sm'
                            src={menu.image_url}
                            alt={menu.name}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
                <div className='flex flex-col flex-1'>
                    <div className='h-full flex flex-1 flex-col'>
                        <motion.div
                            className='h-full w-full flex flex-col justify-center gap-2 text-ellipsis whitespace-nowrap'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <p className='font-Poppins text-[15px] font-semibold text-black'>
                                {menu.name} <span className={`${menu.stock === "Tersedia" ? 'bg-green-300' : 'bg-red-300'} px-2 py-[1.5px] rounded-full text-sm`}>{menu.stock}</span>
                            </p>
                            <p className='font-Poppins text-[14px] font-semibold text-green-500 text-ellipsis whitespace-nowrap'>
                                Rp. {menu.price.toLocaleString('id-ID')}
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className='w-full flex justify-end px-3 gap-2 md:gap-4 md:px-4 items-center py-3 z-50'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <motion.button
                            className='py-2 px-2 sm:py-2 sm:px-3 bg-green-600 hover:bg-green-700 text-slate-100 text-[10px] sm:text-[12px] font-Poppins rounded-lg'
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                Navigate('/Admin/Edit-Menu', { state: { menu } })
                            }}
                        >
                            Edit Menu
                        </motion.button>
                        <motion.button
                            className='py-2 px-2 sm:py-2 sm:px-3 bg-red-600 hover:bg-red-700 text-slate-100 text-[10px] sm:text-[12px] font-Poppins rounded-lg'
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                DeleteMenuButton();
                            }}
                        >
                            Hapus Menu
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuList;
