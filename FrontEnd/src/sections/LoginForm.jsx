import React, { useEffect, useState } from "react";
import Input from "../atoms/Input";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from "../redux/slices/LoginModalSlice";
import { toggleLogin, toggleRegister } from "../redux/slices/LoginOrRegisterSlice";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LoginForm = () => {
    const {login, register} = useSelector(state => state.LoginOrRegister);
    
    const dispatch = useDispatch();

    const ToggleModal = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        dispatch(toggleModal());
        setTimeout(() => {
            dispatch(toggleLogin(false));
            dispatch(toggleRegister(false));
        }, 1000);
    };

    const changeToRegisterOrLogin = () => {
        if(login) {
            dispatch(toggleLogin(false));
            dispatch(toggleRegister(true));
        }else {
            dispatch(toggleLogin(true));
            dispatch(toggleRegister(false));
        }
    }

    return (
        <motion.div 
            key="LoginForm"
            initial={{y: 900}}
            animate={{opacity: 1, y: 100}}
            exit={{y: 900, transition:{duration: 1.5, delay: 0.2}}}
            transition={{delay: 0.2, duration: 1.5, ease:'easeOut'}}
            className="h-screen w-screen flex flex-col"
        >
            <div className="w-full translate-y-1" >
                <svg viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg"><path d="M 0,600 L 0,300 C 74.64114832535884,308.7081339712919 149.28229665071768,317.4162679425837 240,331 C 330.7177033492823,344.5837320574163 437.5119617224881,363.0430622009569 535,321 C 632.4880382775119,278.9569377990431 720.6698564593302,176.41148325358853 828,111 C 935.3301435406698,45.588516746411486 1061.8086124401914,17.311004784688997 1167,5 C 1272.1913875598086,-7.311004784688995 1356.0956937799042,-3.6555023923444976 1440,0 L 1440,600 L 0,600 Z" fill="#ffffff"></path></svg>
                <div onClick={ToggleModal} className="absolute top-14 right-5 h-8 w-8 rounded-full bg-[#DDDDDD] flex justify-center items-center cursor-pointer">
                    <IoCloseOutline size={20} />
                </div>
            </div>
            <div className="flex-1 w-full bg-white z-10">
                <div className="w-full h-full">
                    <div className="flex justify-center items-center flex-col gap-8 font-bold">
                        <h1 className="font-Playwrite text-2xl text-green-500">Welcome To King Cofee</h1>
                        <p className="font-Poppins text-md">{login ? "Login To Your Account" : "Create Your New Account"}</p>
                        <br />
                    </div>
                    <div className="w-full">
                        <AnimatePresence >
                            {login && (
                                <LoginInput />
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {register && (
                                <RegisterForm />
                            )} 
                        </AnimatePresence>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center">
                            <div className="flex-1 ml-2">
                                <hr className="w-full border-gray-300 my-2"/>
                            </div>
                            <div className="flex-1 text-center">
                                <span className="mx-4 text-gray-500 text-xs">Or Sign In With</span>
                            </div>
                            <div className="flex-1 mr-2">
                                <hr className="w-full border-gray-300 my-2"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 mb-10 flex justify-center gap-8">
                        <div className="flex justify-center items-center">
                            <div className="h-14 w-14 bg-white rounded-full flex justify-center items-center overflow-hidden cursor-pointer border">
                                <FcGoogle size="26" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="h-14 w-14 bg-white rounded-full flex justify-center items-center overflow-hidden cursor-pointer border">
                                <svg width="30px" height="30px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"/>
                                    <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#18ACFE"/>
                                    <stop offset="1" stopColor="#0163E0"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-center font-Poppins mb-10">
                        <span>{login ? "Belum punya account " : "Sudah Punya account "}<a onClick={changeToRegisterOrLogin} className="text-blue-600 cursor-pointer">{login ? "Daftar Disini !" : "Login Disini !"}</a></span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LoginInput = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const checkRememberMe  = () => {
            const getData = JSON.parse(localStorage.getItem('rememberMe'));

            if (getData) {
                setEmailInput(getData.emailInput);
                setPasswordInput(getData.passwordInput);
            }
        }
        checkRememberMe();
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // mencegah reload website default

        try {
            const loginData = {
                emailInput,
                passwordInput,
            };

            const response = await axios.post('http://localhost:3001/api/users/login', loginData);

            if (response) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', JSON.stringify(loginData));
                }

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }else {
                console.log('Login gagal:', response.data);
                setLoginError('email atau password salah!');
            }

        } catch (error) {
            console.error('Error saat login:', error);
            setLoginError('email atau password salah!');
        }
    };

    const showpasswordToggle = () => {
        var showpassword = document.getElementById("password");
        if (showpassword.type === "password") {
            showpassword.type = "text";
            setIsShowPassword(true);
        } else {
            showpassword.type = "password";
            setIsShowPassword(false);
        }
    }
    return (
        <form className="w-full h-full px-6" method="POST" onSubmit={handleLoginSubmit}>
            {loginError && <p  className="text-red-700 font-Poppins text-sm pt-3 text-center">{loginError}</p>}
            <div className="w-full flex flex-col py-3">
                <label htmlFor="email" className="font-Poppins text-md font-medium">Email</label>
                <Input type="email" id="email" name="email" inputValue={emailInput} setInputValue={setEmailInput} placeholder="Masukan email kamu" />
                <br />
            </div>
            <div className="w-full flex flex-col relative">
                <label htmlFor="password" className="font-Poppins text-md font-medium">Password</label>
                <Input type="password" id="password" name="password" inputValue={passwordInput} setInputValue={setPasswordInput} placeholder="Masukan password kamu" />
                {isShowPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showpasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showpasswordToggle}/>
                )}
            </div>
            <div className="w-full flex pt-4 items-center justify-between">
                <div>
                    <input id="Rememberme" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded m-auto " />
                    <label htmlFor="Rememberme" className="ms-2 text-sm text-black text-center font-Poppins font-medium">Remember Me</label>
                </div>
                <div>
                    <a href="#" target="#" className="text-sm text-blue-600 cursor-pointer text-center font-Poppins font-medium">Lupa Password ?</a>
                </div>
            </div>
            <div className="w-full flex justify-center items-center py-8">
                <button type="submit" className="h-12 w-[70%] bg-green-500 font-Poppins font-semibold text-slate-50 rounded-full cursor-pointer tracking-wide">LOGIN</button>
            </div>
        </form>
    )
}

export default LoginForm;