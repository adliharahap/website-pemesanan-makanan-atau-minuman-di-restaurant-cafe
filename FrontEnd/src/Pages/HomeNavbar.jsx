import React, { useState, useEffect } from "react";
import { FaHome, FaInfoCircle, FaUtensils, FaTable, FaRegQuestionCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toggleLogin, toggleRegister } from "../redux/slices/LoginOrRegisterSlice";
import { useDispatch } from "react-redux";

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginToggle = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleRegister(false));
  };

  const handleRegisterToggle = () => {
    dispatch(toggleLogin(false));
    dispatch(toggleRegister(true));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-black bg-opacity-50 backdrop-blur-md text-white shadow-md" : "bg-transparent text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]"
      } transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        <h1 className="text-lg font-bold font-poppins">Café Cerita</h1>
        <ul className="flex items-center space-x-4 text-sm">
          <li>
            <a href="#home" className="hover:text-orange-400 flex items-center font-Poppins">
              <FaHome className="mr-1" /> Beranda
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-orange-400 flex items-center font-Poppins">
              <FaInfoCircle className="mr-1" /> About
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-orange-400 flex items-center font-Poppins">
              <FaUtensils className="mr-1" /> Daftar Menu
            </a>
          </li>
          <li>
            <a href="#help" className="hover:text-orange-400 flex items-center font-Poppins">
              <FaRegQuestionCircle className="mr-1" /> Pusat Bantuan
            </a>
          </li>
          <li>
            <a href="#location" className="hover:text-orange-400 flex items-center font-Poppins">
              <FaMapMarkerAlt className="mr-1" /> Lokasi
            </a>
          </li>
        </ul>
        <div className="space-x-2 text-sm">
          <button onClick={() => {navigate("/login"); handleLoginToggle();}} className="px-3 py-1 font-Poppins bg-white text-yellow-400 font-semibold rounded hover:bg-gray-100 transition">
            Login
          </button>
          <button onClick={() => {navigate("/login"); handleRegisterToggle();}} className="px-3 py-1 font-Poppins bg-yellow-500 text-white font-semibold rounded hover:bg-green-800 transition">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
