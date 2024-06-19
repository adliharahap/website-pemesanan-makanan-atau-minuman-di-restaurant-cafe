import React,{useState} from "react";
import Input from "../atoms/Input";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const RegisterForm = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

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

    return (
        <form action="" className="w-full h-full px-6">
            <div className="w-full flex flex-col py-3">
                <label htmlFor="username" className="font-Poppins text-md font-medium">Username</label>
                <Input type="text" id="username" name="username" placeholder="Masukan username kamu" />
                <br />
            </div>
            <div className="w-full flex flex-col pb-3">
                <label htmlFor="email" className="font-Poppins text-md font-medium">Email</label>
                <Input type="email" id="email" name="email" placeholder="Masukan email kamu" />
                <br />
            </div>
            <div className="w-full flex flex-col relative pb-3">
                <label htmlFor="password" className="font-Poppins text-md font-medium">Password</label>
                <Input type="password" id="password" name="password" placeholder="Masukan password kamu" />
                {isShowPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showpasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showpasswordToggle}/>
                )}
                <br />
            </div>
            <div className="w-full flex flex-col relative">
                <label htmlFor="confirmPassword" className="font-Poppins text-md font-medium">Confirm Password</label>
                <Input type="Password" id="confirmPassword" name="confirmPassword" placeholder="confirm password kamu" />
                {isShowConfirmPassword ? (
                    <FaEyeSlash className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showConfirmPasswordToggle}/>
                ) : (
                    <FaRegEye className="absolute right-3 top-8 cursor-pointer" size="20" onClick={showConfirmPasswordToggle}/>
                )}
            </div>
            <div className="w-full flex justify-center items-center py-12">
                <button type="submit" className="h-12 w-[70%] bg-green-500 font-Poppins font-semibold text-slate-50 rounded-full cursor-pointer tracking-wide">REGISTER</button>
            </div>
        </form>
    );
};

export default RegisterForm;