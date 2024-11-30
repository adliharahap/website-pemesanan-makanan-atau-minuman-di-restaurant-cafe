import React, { useEffect, useState } from "react";
import { verifyToken } from "../utils/checkUserToken";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import HomeNavbar from "./HomeNavbar";
import { FaArrowRight } from "react-icons/fa";
import PopcornImages from "../assets/website_image/Popcorn-removebg-preview.png";
import CoffeImages from "../assets/website_image/lex-sirikiat-VkUP6wWqSvw-unsplash-removebg-preview.png"
import HomeMenuList from '../components/LandingPagesComponent/HomeMenuList';
import HelpSection from "../components/LandingPagesComponent/HelpSection";
import LocationSection from "../components/LandingPagesComponent/LocationSection";
import CopyrightSection from "../components/LandingPagesComponent/CopyrightSection";
import BackgroundImage from "../assets/website_image/background.jpg"

const Homepages = () => {
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginOrNot = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const isValid = await verifyToken(token, dispatch);
        if (isValid) {
          if (userData && userData.role) {
            if (userData.role === "admin") {
              navigate("/Admin/Dashboard");
            } else if (userData.role === "chef") {
              navigate("/Chef/ConfirmOrders");
            } else if (userData.role === "cashier") {
              navigate("/Cashier/Payment");
            } else if (userData.role === "waiter") {
              navigate("/Waiter/Dashboard");
            } else {
              navigate("/");
            }
          }
        } else {
          console.log("Token sudah expired");
          return 0;
        }
      } else {
      }
    };

    checkLoginOrNot();
  }, [navigate, dispatch, userData]);

  return (
    <div className="font-poppins overflow-x-hidden">
      <HomeNavbar />

      {/* Home Section */}
      <motion.section
        id="home"
        className="h-screen w-screen flex items-center justify-start bg-cover bg-center text-white"
        style={{
          backgroundImage:
            `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.8 }}
      >
        <div className="bg-[#25211B] bg-opacity-50 p-8 w-[50%] h-screen flex items-center border-r-[1.5px] border-[#25211B] ">
          <div>
            <h2 className="text-2xl sm:text-8xl font-bold mb-6 text-yellow-500 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
              Welcome to King Coffee
            </h2>
            <p className="text-base sm:text-lg text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
              Indulge in the finest coffee and delicious treats that will take your taste buds on a royal journey.
            </p>
            <motion.a
              className="mt-4 border-[1.5px] border-white text-white py-2 px-8 rounded-lg flex items-center justify-center w-48"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#about"
            >
              <span className="flex items-center justify-center gap-3 font-semibold">
                Show More
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <FaArrowRight />
                </motion.div>
              </span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="h-screen w-screen flex justify-center bg-cover bg-center text-white text-center flex-row-reverse bg-[#1D1710] overflow-hidden relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="rounded-md w-full h-full relative z-30">
          <div className="pt-24 pb-10 w-full text-center">
            <h2 className="text-2xl sm:text-6xl font-bold pr-8 text-yellow-500 font-Poppins drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">Tentang Kami</h2>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className=" w-1/2 py-2 px-16 text-justify">
              <p className="text-base sm:text-xl font-semibold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)">
                Kami adalah restoran yang mengutamakan kualitas dan kelezatan di setiap hidangan. Dengan pengalaman panjang di dunia kuliner, kami menghadirkan cita rasa istimewa yang akan memanjakan lidah Anda.
              </p>
              <p className="text-base sm:text-xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)">
              Dari masakan lokal yang autentik hingga sajian internasional yang menggugah selera, setiap menu dibuat dengan bahan-bahan segar dan disajikan dengan tampilan yang memikat.
              </p>
            </div>
          </div>
        </div>

        {/* design */}
        <div className="flex gap-6 absolute z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" x="0" y="0" style={{ enableBackground: "new 0 0 512 512" }} viewBox="0 0 512 512" ><path d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM192.296 77.437h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10zm25.02 357.134h52.407c5.523 0 10-4.477 10-10V319.717c0-5.523-4.477-10-10-10H164.868c-5.523 0-10 4.477-10 10V424.57c0 5.523 4.477 10 10 10h52.428l.02.001zm129.835-47.427h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm0-184.854c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.855zm-154.855 77.427c5.523 0 10-4.477 10-10V164.863c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v104.853c0 5.523 4.477 10 10 10h104.854zm282.283 77.427h27.418c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10h-27.418c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm-387.137 0h27.427c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm387.137-202.28c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.418c5.523 0 10-4.477 10-10V164.864c0-5.523-4.477-10-10-10h-27.418zm-87.428-40c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10v104.864zm37.428 242.28c5.523 0 10-4.477 10-10V242.29c0-5.523-4.477-10-10-10H319.723c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.856zM37.433 154.864h-27.43c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.43c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm387.146 0h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.478-10-10-10zm-269.71 319.707V502c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.429c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10zm357.128-77.427c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10V502c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V397.144zm-279.701 77.429V502c0 5.523 4.477 10 10 10h104.855c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10zM.003 397.147V502c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V397.147c0-5.523-4.477-10-10-10H10.003c-5.522 0-10 4.477-10 10zM37.429 232.29H10.003c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.426c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM217.296 47.437h52.427c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H164.869c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h52.427zm139.855-10V10c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10zM.003 114.864c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10.003c-5.523 0-10 4.477-10 10v104.864z" fill="rgba(219,182,129, 1)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" x="0" y="0" style={{ enableBackground: "new 0 0 512 512" }} viewBox="0 0 512 512" ><path d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM192.296 77.437h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10zm25.02 357.134h52.407c5.523 0 10-4.477 10-10V319.717c0-5.523-4.477-10-10-10H164.868c-5.523 0-10 4.477-10 10V424.57c0 5.523 4.477 10 10 10h52.428l.02.001zm129.835-47.427h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm0-184.854c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.855zm-154.855 77.427c5.523 0 10-4.477 10-10V164.863c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v104.853c0 5.523 4.477 10 10 10h104.854zm282.283 77.427h27.418c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10h-27.418c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm-387.137 0h27.427c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm387.137-202.28c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.418c5.523 0 10-4.477 10-10V164.864c0-5.523-4.477-10-10-10h-27.418zm-87.428-40c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10v104.864zm37.428 242.28c5.523 0 10-4.477 10-10V242.29c0-5.523-4.477-10-10-10H319.723c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.856zM37.433 154.864h-27.43c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.43c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm387.146 0h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.478-10-10-10zm-269.71 319.707V502c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.429c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10zm357.128-77.427c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10V502c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V397.144zm-279.701 77.429V502c0 5.523 4.477 10 10 10h104.855c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10zM.003 397.147V502c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V397.147c0-5.523-4.477-10-10-10H10.003c-5.522 0-10 4.477-10 10zM37.429 232.29H10.003c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.426c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM217.296 47.437h52.427c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H164.869c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h52.427zm139.855-10V10c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10zM.003 114.864c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10.003c-5.523 0-10 4.477-10 10v104.864z" fill="rgba(34,26,20, 1)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" x="0" y="0" style={{ enableBackground: "new 0 0 512 512" }} viewBox="0 0 512 512" ><path d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM192.296 77.437h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10zm25.02 357.134h52.407c5.523 0 10-4.477 10-10V319.717c0-5.523-4.477-10-10-10H164.868c-5.523 0-10 4.477-10 10V424.57c0 5.523 4.477 10 10 10h52.428l.02.001zm129.835-47.427h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm0-184.854c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.855zm-154.855 77.427c5.523 0 10-4.477 10-10V164.863c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v104.853c0 5.523 4.477 10 10 10h104.854zm282.283 77.427h27.418c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10h-27.418c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm-387.137 0h27.427c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm387.137-202.28c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.418c5.523 0 10-4.477 10-10V164.864c0-5.523-4.477-10-10-10h-27.418zm-87.428-40c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10v104.864zm37.428 242.28c5.523 0 10-4.477 10-10V242.29c0-5.523-4.477-10-10-10H319.723c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.856zM37.433 154.864h-27.43c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.43c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm387.146 0h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.478-10-10-10zm-269.71 319.707V502c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.429c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10zm357.128-77.427c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10V502c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V397.144zm-279.701 77.429V502c0 5.523 4.477 10 10 10h104.855c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10zM.003 397.147V502c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V397.147c0-5.523-4.477-10-10-10H10.003c-5.522 0-10 4.477-10 10zM37.429 232.29H10.003c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.426c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM217.296 47.437h52.427c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H164.869c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h52.427zm139.855-10V10c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10zM.003 114.864c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10.003c-5.523 0-10 4.477-10 10v104.864z" fill="rgba(219,182,129, 0.9)"></path></svg>
        </div>
        <div className="absolute bottom-30 left-0 h-[550px] w-[40%] sepia-50 -hue-rotate-15 z-20" style={{backgroundImage: `url(${PopcornImages})`, rotate: "180deg", backgroundRepeat: "no-repeat", backgroundPositionX: "100px", backgroundPositionY : "-15px",}}></div>
        <div className="absolute bottom-30 right-0 h-[550px] w-[40%] sepia-50 hue-rotate-15 z-20" style={{backgroundImage: `url(${CoffeImages})`, backgroundRepeat: "no-repeat", backgroundPositionX: "100px", backgroundPositionY : "-15px",}}></div>
      </motion.section>

      {/* Menu Section */}
      <motion.section
        id="menu"
        className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center text-white text-center bg-[#1D1710] pb-5"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="rounded-md w-full h-full relative z-30">
          <div className="pt-16 pb-10 w-full text-center">
            <h2 className="text-2xl sm:text-6xl font-bold pr-8 text-yellow-500 font-Poppins drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">Daftar Menu</h2>
          </div>
          <div className="w-full">
            <HomeMenuList />
          </div>
        </div>
      </motion.section>

      {/* Help Section */}
      <HelpSection />

      {/* Location Section */}
      <LocationSection />

      <CopyrightSection />
    </div>
  );
};

export default Homepages;
