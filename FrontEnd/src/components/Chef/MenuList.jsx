import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MenuList = ({ menu, getAllMenu}) => {
    const Navigate = useNavigate();

    const handleUpdateStock = async () => {
        Swal.fire({
            title: 'Update Stok Menu',
            html: `
                <div class="flex justify-center items-center gap-4">
                    <label class="text-gray-700 font-poppins">Stock</label>
                    <select
                        class="w-52 p-3 border border-gray-300 rounded-md font-poppins"
                        onfocus="this.classList.add('border-green-400')"
                        onblur="this.classList.remove('border-green-400')"
                        id="stockSelect"
                    >
                        <option value="tersedia">Tersedia</option>
                        <option value="habis">Habis</option>
                    </select>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                const stockValue = document.getElementById('stockSelect').value;
                if (!stockValue) {
                    Swal.showValidationMessage('Harap pilih status stok!');
                }
                return stockValue;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedStockStatus = result.value;
                console.log('Status stok yang diupdate:', updatedStockStatus);

                try {
                    const menuId = menu.menu_id;
                    const EditMenuData = { menuId, stock: updatedStockStatus };
                    const token = localStorage.getItem('token');

                    const response = await axios.post(
                        'http://localhost:3001/api/users/Chef/UpdateStockMenu',
                        EditMenuData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Menambahkan token di header
                            },
                        }
                    );

                    if (response) {
                        Swal.fire({
                            title: 'Sukses!',
                            text: 'Berhasil update Menu',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                getAllMenu();
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal!',
                            text: 'Menu gagal di update',
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
            }
        });
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
                <div>
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
                </div>
                <div className='flex flex-col w-full'>
                    <div className='h-full flex flex-1 flex-col'>
                        <motion.div
                            className='h-full w-full flex flex-col justify-center gap-2 text-ellipsis whitespace-nowrap'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <p className='font-Poppins text-[15px] font-semibold text-black'>
                                {menu.name} 
                            </p>
                            <p className='font-Poppins text-[14px] font-semibold text-green-500 text-ellipsis whitespace-nowrap'>
                                Rp. {menu.price.toLocaleString('id-ID')} • <span className={`${menu.stock === "Tersedia" ? 'bg-green-300' : 'bg-red-300'} px-2 py-[1.5px] rounded-full text-sm text-black`}>{menu.stock}</span>
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
                                handleUpdateStock();
                            }}
                        >
                            Update Stock menu
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuList;
