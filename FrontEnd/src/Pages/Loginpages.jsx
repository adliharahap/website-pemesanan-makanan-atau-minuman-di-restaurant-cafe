import React from "react";
import Button from "../atoms/Button";
import LoginOrRegister from "../sections/LoginOrRegister";
import Modal from "../components/modal";
import { useSelector } from "react-redux";


const Loginpages = () => {
    const isModalOn = useSelector((state) => state.LoginModal.isModalOn);

    return (
        <div className="flex w-full h-screen justify-center items-center bg-login_bg bg-cover md:bg-slate-100 md:bg-none">
            <LoginOrRegister />
            {isModalOn && (
                <Modal />
            )}
            
        </div>
    );
};

export default Loginpages;