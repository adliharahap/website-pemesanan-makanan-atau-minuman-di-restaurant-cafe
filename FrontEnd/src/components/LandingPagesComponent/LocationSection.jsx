import React from "react";
import { motion } from "framer-motion";

const LocationSection = () => {
  return (
    <motion.section
      id="location"
      className="min-h-screen w-screen bg-[#080704] text-white py-10 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8 mx-16">
        {/* Kiri: Deskripsi Lokasi */}
        <div className=" p-8 rounded-lg shadow-xl flex-1 max-w-lg">
          <h2 className="text-3xl font-bold text-[#e0b67b] mb-4">
            Lokasi Restoran Kami
          </h2>
          <p className="text-[#d3c4a5] text-lg mb-6">
            Restoran kami terletak di kawasan strategis di Tuntungan, dekat dengan
            kampus *UIN-SU*. Lokasi kami memberikan akses mudah dan suasana yang
            nyaman untuk menikmati hidangan terbaik kami. ✨
          </p>
          <p className="text-[#d3c4a5]">
            <strong>Alamat:</strong> <br />
            Jl. Lapangan Golf UIN-SU Tuntungan <br />
            Medan, Sumatera Utara 20135
          </p>
          <div className="mt-6">
            <a
              href="https://goo.gl/maps/Q2sGZ2e9xdN6RgFFA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e0b67b] text-[#3b2719] py-3 px-6 rounded-lg shadow-lg hover:bg-[#d4a067] transition duration-300"
            >
              Lihat di Google Maps
            </a>
          </div>
        </div>

        {/* Kanan: Peta */}
        <div className="flex-1 rounded-lg shadow-xl overflow-hidden max-w-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127160.39973681959!2d98.52816930455305!3d3.5561473247687326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312fbe2d39b749%3A0x6bbf5e6d5c86e8f2!2sUIN%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1698486238769!5m2!1sid!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Google Maps UIN-SU"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection;
