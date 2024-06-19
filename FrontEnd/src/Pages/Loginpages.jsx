import React from "react";
import LoginOrRegister from "../sections/LoginOrRegister";
import { useSelector } from "react-redux";
import LoginForm from "../sections/LoginForm";
import { AnimatePresence } from "framer-motion";


const Loginpages = () => {
    const isModalOn = useSelector((state) => state.LoginModal.isModalOn);

    return (
        <div className="flex w-full h-screen justify-center items-center bg-login_bg bg-repeat bg-cover md:bg-slate-100 md:bg-none">
            <AnimatePresence>
                {isModalOn && (
                    <LoginOrRegister />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!isModalOn && (
                    <LoginForm key="LoginForm"/>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Loginpages;