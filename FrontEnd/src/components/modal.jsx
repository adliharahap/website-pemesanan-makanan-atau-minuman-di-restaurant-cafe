import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose }) => {

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0, translateY: '100%' }}
                animate={isOpen ? { opacity: 1, translateY: '0%' } : { opacity: 0, translateY: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
                    <p>Content goes here...</p>
                    <button  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </motion.div> 
        </>
    );
}

export default Modal;