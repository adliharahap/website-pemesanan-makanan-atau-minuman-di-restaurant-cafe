import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from "../redux/slices/LoginModalSlice";
import { motion} from "framer-motion";
import { toggleLogin, toggleRegister } from "../redux/slices/LoginOrRegisterSlice";
import { useNavigate} from "react-router-dom";



const LoginOrRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginToggle = () => {
        dispatch(toggleLogin(true));
        dispatch(toggleRegister(false));
        dispatch(toggleModal());
    };

    const handleRegisterToggle = () => {
        dispatch(toggleLogin(false));
        dispatch(toggleRegister(true));
        dispatch(toggleModal());
    };

    useEffect(() => {
        const checkLoginOrNot = () => {
            if (localStorage.getItem('token')) {
                navigate('/');
            }
        }

        checkLoginOrNot();
    }, [navigate])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, position: "absolute"}}
            exit={{ opacity: 0, y: 500 ,transition: { duration: 1 }, position: "absolute" }}
            transition={{ ease: "easeOut", duration: 1.5 }}
            className="h-[80%] w-[80%] black-glass-bg rounded-lg flex flex-col overflow-hidden"
        >
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <div className="h-full w-full flex justify-center items-center">
                        <h1 className="font-Playwrite text-4xl font-black text-white font-shadow">King Coffe</h1>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-full w-full flex justify-center items-center p-5">
                        <p className="font-Poppins text-center text-sm font-black text-slate-100 font-shadow">Makasih Rendang nya orang baik baik😁😁</p>
                    </div>
                </div>
            </div>
            <div className="h-[40%]">
                <div className="h-full w-full flex justify-center items-center gap-5 flex-col">
                    <button className="h-[45px] w-[70%] border-2 rounded-lg text-slate-100 font-shadow font-Poppins text-lg hover:cursor-pointer" onClick={handleLoginToggle}>LOGIN</button>
                    <button className="h-[45px] w-[70%] bg-[#2B7821] rounded-lg text-slate-100  shadow-box font-shadow font-Poppins text-lg hover:cursor-pointer" onClick={handleRegisterToggle}>REGISTER</button>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginOrRegister;