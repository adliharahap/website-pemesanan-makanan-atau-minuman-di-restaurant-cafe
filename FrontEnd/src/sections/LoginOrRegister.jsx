import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/slices/LoginModalSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  toggleLogin,
  toggleRegister,
} from "../redux/slices/LoginOrRegisterSlice";
import DekstopLogin from "./DekstopLogin";
import DekstopRegister from "./DekstopRegister";
import { useNavigate } from "react-router-dom";

const LoginOrRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const {login, register} = useSelector(state => state.LoginOrRegister);

  const changeToRegisterOrLogin = () => {
      if(login) {
          dispatch(toggleLogin(false));
          dispatch(toggleRegister(true));
      }else {
          dispatch(toggleLogin(true));
          dispatch(toggleRegister(false));
      }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", handleResize);

    // Cleanup saat komponen unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <>
      {isDesktop ? (
        <>
          <div className="min-h-screen w-screen relative">
            {/* SVG Background */}
            <div className="absolute h-full w-full top-0 left-0 z-0">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="a"
                    patternUnits="userSpaceOnUse"
                    width="69.283"
                    height="40"
                    patternTransform="scale(2) rotate(0)"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="hsla(240,6.7%,17.6%,1)"
                    />
                    <path
                      d="M46.189-20L57.736 0M46.189 20l11.547 20m-46.189 0l11.547 20M11.547 0l11.547 20m40.415 30H40.415M28.868 30H5.774m23.094-40H5.774m57.735 20H40.415m0 20L28.868 50m11.547-60L28.868 10m46.188 0L63.509 30M5.774 10L-5.773 30m75.056 10H46.189L34.64 20 46.19 0h23.094C73.13 6.667 76.98 13.333 80.83 20zM57.736 60H34.64L23.094 40l11.547-20h23.095c3.848 6.667 7.698 13.333 11.547 20L57.736 60zm0-40H34.64L23.094 0l11.547-20h23.095L69.283 0c-3.87 6.7-8.118 14.06-11.547 20zM34.64 60H11.547L0 40l11.547-20h23.094L46.19 40 34.64 60zm0-40H11.547L0 0l11.547-20h23.094L46.19 0 34.64 20zM23.094 40H0l-5.773-10-5.774-10L0 0h23.094l11.547 20-11.547 20z"
                      strokeWidth="1"
                      stroke="#000"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect
                  width="800%"
                  height="800%"
                  transform="translate(0,0)"
                  fill="url(#a)"
                />
              </svg>
            </div>
            <div onClick={() => {navigate('/')}} className={`absolute z-20 top-5 left-10 rounded-full bg-black flex justify-center items-center border cursor-pointer ${register && 'mt-40'}`}>
                <p className="font-Poppins text-[12px] text-white py-3 px-4"> ← Kembali Ke Website</p>
            </div>

            {/* Content Above SVG */}
            <div className="relative z-10 w-full h-full flex">
              
              <div className="w-full flex justify-center items-center">
                <div className={`bg-[rgba(0,0,0,0.4)] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-slate-600 w-[40%] min-h-96 ${register ? 'mt-40 mb-10' : 'mt-12'}`}>
                    <div className="flex justify-center items-center py-5">
                        <h1 className="font-Poppins text-yellow-500 text-3xl">King Coffe</h1>
                    </div>
                    <div className="flex-1">
                        <AnimatePresence >
                            {login && (
                                <DekstopLogin />
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {register && (
                                <DekstopRegister />
                            )} 
                        </AnimatePresence>
                    </div>
                    <div className="text-[14px] text-center font-Poppins mb-10 text-white">
                        <span>{login ? "Belum punya account " : "Sudah Punya account "}<a onClick={changeToRegisterOrLogin} className="text-cyan-400 cursor-pointer">{login ? "Daftar Disini !" : "Login Disini !"}</a></span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, position: "absolute" }}
          exit={{
            opacity: 0,
            y: 500,
            transition: { duration: 1 },
            position: "absolute",
          }}
          transition={{ ease: "easeOut", duration: 1.5 }}
          className="h-[80%] w-[80%] black-glass-bg rounded-lg flex flex-col overflow-hidden"
        >
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <div className="h-full w-full flex justify-center items-center">
                <h1 className="font-Playwrite text-4xl font-black text-white font-shadow">
                  King Coffe
                </h1>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-full w-full flex justify-center items-center p-5">
                <p className="font-Poppins text-center text-sm font-black text-slate-100 font-shadow">
                    Klik tombol Login untuk masuk ke akun Anda, atau tombol Register untuk membuat akun baru.
                </p>
              </div>
            </div>
          </div>
          <div className="h-[40%]">
            <div className="h-full w-full flex justify-center items-center gap-5 flex-col">
              <button
                className="h-[45px] w-[70%] border-2 rounded-lg text-slate-100 font-shadow font-Poppins text-lg hover:cursor-pointer"
                onClick={handleLoginToggle}
              >
                LOGIN
              </button>
              <button
                className="h-[45px] w-[70%] bg-[#2B7821] rounded-lg text-slate-100  shadow-box font-shadow font-Poppins text-lg hover:cursor-pointer"
                onClick={handleRegisterToggle}
              >
                REGISTER
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LoginOrRegister;
