import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const CopyrightSection = () => {
  return (
    <footer
      className="bg-black text-white py-10"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Kiri: Kontak dan Alamat */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-sm">
              <FaPhoneAlt size={18} /> +62 896-7665-5115
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaEnvelope size={18} /> adliharahap1123@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt size={18} /> Jl. Tuntungan No. 123, Medan
            </p>
          </div>
        </div>

        {/* Tengah: Copyright */}
        <div className="mb-6 md:mb-0">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} Restoran Premium. All rights reserved.
          </p>
          <div className="text-sm mt-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              FAQ
            </a>
          </div>
        </div>

        {/* Kanan: Ikon Sosial Media */}
        <div className="flex gap-6 justify-center md:justify-end">
          <a
            href="#"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightSection;
