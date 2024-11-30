import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuDescriptionPages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    

    return (
        <div className="bg-white min-h-screen flex flex-col items-center p-4 sm:p-10 md:px-20">
            {/* Header */}
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <h1 className="text-green-800 text-3xl sm:text-5xl font-bold font-Poppins mb-3">
                    {state.menu.name}
                </h1>
                <p className="text-brown-500 text-lg sm:text-xl font-semibold">#{state.menu.Type}</p>
            </motion.div>

            {/* Image */}
            <motion.div
                className="w-full sm:w-2/3 lg:w-1/2 mb-10 overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <img
                    src={state.menu.image_url}
                    alt={state.menu.name}
                    className="w-full object-cover"
                />
            </motion.div>

            {/* Details */}
            <motion.div
                className="bg-green-100 rounded-lg shadow-md w-full sm:w-2/3 lg:w-1/2 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="text-green-700 text-2xl font-semibold mb-4 font-Poppins">
                    Deskripsi
                </h2>
                <p className="text-gray-800 text-base mb-6 font-Poppins">
                    {state.menu.description}
                </p>

                <div className="flex flex-wrap justify-between items-center mb-6">
                    <motion.div
                        className="text-xl text-green-700 font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Harga: <span className="text-green-800">Rp. {state.menu.price.toLocaleString('id-ID')}</span>
                    </motion.div>
                    <motion.div
                        className={`${
                            state.menu.stock === 'Tersedia' ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-4 py-2 rounded-lg font-semibold`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {state.menu.stock === 'Tersedia' ? 'Tersedia' : 'Habis'}
                    </motion.div>
                </div>

                {/* Menu ID */}
                <div className="text-gray-600 text-sm italic">
                    <p>Menu ID: {state.menu.menu_id}</p>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <button
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md font-Poppins text-lg transition"
                    onClick={() => {navigate(-1)}}
                >
                    Kembali ke Daftar Menu
                </button>
            </motion.div>
        </div>
    );
};

export default MenuDescriptionPages;
