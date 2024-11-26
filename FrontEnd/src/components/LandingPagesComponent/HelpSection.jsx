import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhoneCall, FiMessageSquare } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

const HelpSection = () => {
  return (
    <motion.section
      id="help"
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center text-white text-center bg-[#14100b] py-12"
      style={{
        backgroundImage: "url(https://source.unsplash.com/1600x900/?help)",
      }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className=" w-[90%] max-w-4xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          Pusat Bantuan
        </h2>
        <p className="text-gray-300 mb-8">
          Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu
          untuk menghubungi kami melalui salah satu metode berikut:
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Email */}
          <div className="flex flex-col items-center bg-[#27241D] rounded-lg p-6 shadow-md hover:bg-[#32271771] transition-all">
            <FiMail className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Email
            </h3>
            <p className="text-gray-300">
              Kirim pesan melalui email kami di{" "}
              <a
                href="mailto:adliharahap1123@gmail.com"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                adliharahap1123@gmail.com
              </a>
            </p>
          </div>

          {/* Telepon */}
          <div className="flex flex-col items-center bg-[#27241D] rounded-lg p-6 shadow-md hover:bg-[#32271771] transition-all">
            <FiPhoneCall className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Telepon
            </h3>
            <p className="text-gray-300">
              Hubungi kami langsung di{" "}
              <a
                href="tel:+6289676655115"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                +62 896-7665-5115
              </a>
            </p>
          </div>

          {/* Chat */}
          <div className="flex flex-col items-center bg-[#27241D] rounded-lg p-6 shadow-md hover:bg-[#32271771] transition-all">
            <BsChatDots className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Chat Online
            </h3>
            <p className="text-gray-300">
              Chat dengan kami secara langsung melalui{" "}
              <a
                href="#"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                aplikasi chat
              </a>
            </p>
          </div>

          {/* Pesan */}
          <div className="flex flex-col items-center bg-[#27241D] rounded-lg p-6 shadow-md hover:bg-[#32271771] transition-all">
            <FiMessageSquare className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Formulir Pesan
            </h3>
            <p className="text-gray-300">
              Isi formulir pesan kami{" "}
              <a
                href="#form"
                className="underline text-yellow-300 hover:text-yellow-400"
              >
                di sini
              </a>{" "}
              untuk mendapatkan bantuan.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HelpSection;
