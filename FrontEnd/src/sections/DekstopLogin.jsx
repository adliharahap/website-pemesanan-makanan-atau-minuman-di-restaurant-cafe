import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import InputDekstop from "../atoms/InputDekstop";
import { useDispatch } from "react-redux";

const DekstopLogin = () => {
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
            {loginError && <p className="text-red-700 font-Poppins text-sm pt-3 text-center">{loginError}</p>}
            <div className="w-full flex flex-col py-3">
                <label htmlFor="email" className="font-Poppins text-md font-medium text-white">Email</label>
                <InputDekstop type="email" id="email" name="email" inputValue={emailInput} setInputValue={setEmailInput} placeholder="Masukan email kamu" />
                <br />
            </div>
            <div className="w-full flex flex-col relative">
                <label htmlFor="password" className="font-Poppins text-md font-medium text-white">Password</label>
                <InputDekstop type="password" id="password" name="password" inputValue={passwordInput} setInputValue={setPasswordInput} placeholder="Masukan password kamu" />
                {isShowPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showpasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showpasswordToggle}/>
                )}
            </div>
            <div className="w-full flex pt-4 items-center justify-between">
                <div>
                    <input id="Rememberme" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded m-auto bg-transparent " />
                    <label htmlFor="Rememberme" className="ms-2 text-sm text-white text-center font-Poppins font-medium">Remember Me</label>
                </div>
                <div>
                    <a href="#" target="#" className="text-sm text-cyan-400 cursor-pointer text-center font-Poppins font-medium">Lupa Password ?</a>
                </div>
            </div>
            <div className="w-full flex justify-center items-center py-8">
                <button type="submit" className="h-12 w-[70%] bg-cyan-600 font-Poppins font-semibold text-slate-50 rounded-full cursor-pointer tracking-wide">LOGIN</button>
            </div>
        </form>
    )
}

export default DekstopLogin;