import React,{useState} from "react";
import Input from "../atoms/Input";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import InputDekstop from './../atoms/InputDekstop';


const DekstopRegister = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);

    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [PasswordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    const navigate = useNavigate();

    const showpasswordToggle = () => {
        const showpassword = document.getElementById("password");
        if (showpassword.type === "password") {
            showpassword.type = "text";
            setIsShowPassword(true);
        } else {
            showpassword.type = "password";
            setIsShowPassword(false);
        }
    }

    const showConfirmPasswordToggle = () => {
        const showpassword = document.getElementById("confirmPassword");
        if (showpassword.type === "password") {
            showpassword.type = "text";
            setIsShowConfirmPassword(true);
        } else {
            showpassword.type = "password";
            setIsShowConfirmPassword(false);
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); // mencegah reload website default

        try {
            if (confirmPasswordInput !== PasswordInput ) {
                setValidatePassword(true);
            }

            const UsersRegistrationData = {
                usernameInput,
                emailInput,
                PasswordInput,
                confirmPasswordInput,
            }

            axios.post('http://localhost:3001/api/users/registration', UsersRegistrationData)
            .then(response => {
                console.log('Akun berhasil dibuat:', response.data);
                localStorage.setItem('token', response.data.token);

                navigate('/');
            })
            .catch(error => {
                console.error('Error saat registrasi:', error);
            });

        } catch (error) {
            console.log('error : ', error);
        }
    };

    return (
        <form className="w-full h-full px-6" onSubmit={handleRegisterSubmit} method="POST">
            <div className="w-full flex flex-col py-3">
                <label htmlFor="username" className="font-Poppins text-md font-medium text-white">Username</label>
                <InputDekstop type="text" id="username" name="username" inputValue={usernameInput} setInputValue={setUsernameInput} placeholder="Masukan username kamu" />
                <br />
            </div>
            <div className="w-full flex flex-col pb-3">
                <label htmlFor="email" className="font-Poppins text-md font-medium text-white">Email</label>
                <InputDekstop type="email" id="email" name="email" placeholder="Masukan email kamu" inputValue={emailInput} setInputValue={setEmailInput} />
                <br />
            </div>
            <div className="w-full flex flex-col relative pb-5">
                <label htmlFor="password" className="font-Poppins text-md font-medium text-white">Password</label>
                <InputDekstop type="password" id="password" name="password" placeholder="Masukan password kamu" inputValue={PasswordInput} setInputValue={setPasswordInput} />
                {isShowPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showpasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showpasswordToggle}/>
                )}
                {validatePassword && (
                    <p className="text-red-700 font-Poppins text-sm pt-3">Password dan Confirm Password tidak sama! Silakan coba lagi.</p>
                )}
            </div>
            <div className="w-full flex flex-col relative">
                <label htmlFor="confirmPassword" className="font-Poppins text-md font-medium text-white">Confirm Password</label>
                <InputDekstop type="Password" id="confirmPassword" name="confirmPassword" placeholder="confirm password kamu" inputValue={confirmPasswordInput} setInputValue={setConfirmPasswordInput}/>
                {isShowConfirmPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showConfirmPasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" color="#fff" onClick={showConfirmPasswordToggle}/>
                )}
                {validatePassword && (
                    <p className="text-red-700 font-Poppins text-sm pt-3">Password dan Confirm Password tidak sama! Silakan coba lagi.</p>
                )}
            </div>
            <div className="w-full flex justify-center items-center py-12">
                <button type="submit" className="h-12 w-[70%] bg-cyan-500 font-Poppins font-semibold text-slate-50 rounded-full cursor-pointer tracking-wide">REGISTER</button>
            </div>
        </form>
    );
};

export default DekstopRegister;