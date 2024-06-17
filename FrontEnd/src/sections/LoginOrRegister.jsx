import React from "react";
import { useDispatch } from 'react-redux';
import { toggleModal } from "../redux/slice";



const LoginOrRegister = () => {
    const dispatch = useDispatch();

    const ToggleModal = () => {
        dispatch(toggleModal());
        
    };

    return (
        <div className="h-[80%] w-[80%] black-glass-bg rounded-lg flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <div className="h-full w-full flex justify-center items-center">
                        <h1 className="font-Playwrite text-2xl font-black text-white font-shadow">KING COFFE</h1>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-full w-full flex justify-center items-center p-5">
                        <p className="font-Poppins text-center text-sm font-black text-slate-100 font-shadow">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, fugit repudiandae at voluptatibus similique, itaque culpa excepturi, iusto assumenda dolores accusamus asperiores! Dignissimos voluptatum quos doloremque minus sit fugiat aperiam.</p>
                    </div>
                </div>
            </div>
            <div className="h-[40%]">
                <div className="h-full w-full flex justify-center items-center gap-5 flex-col">
                    <button className="h-[45px] w-[70%] border-2 rounded-lg text-slate-100 font-shadow font-Poppins text-lg hover:cursor-pointer" onClick={ToggleModal}>LOGIN</button>
                    <button className="h-[45px] w-[70%] bg-[#2B7821] rounded-lg text-slate-100  shadow-box font-shadow font-Poppins text-lg hover:cursor-pointer">REGISTER</button>
                </div>
            </div>
        </div>
    );
};

export default LoginOrRegister;