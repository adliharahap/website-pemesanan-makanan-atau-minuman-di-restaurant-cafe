import React from "react";
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';

// MenuList Component
  const MenuItem = ({ menu, expandedIndex, toggleDescription }) => {
    return (
      <div className="w-56 bg-[#27241D] rounded-md shadow-md border-[1.5px] border-[rgb(150,106,55)] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-[#5c3e14ca] cursor-pointer">
        <div className="flex flex-col p-4">
          {/* Gambar Menu */}
          <div className="my-1 flex justify-center items-center">
            <img
              src={menu.image_url}
              alt={menu.name}
              className="h-[180px] w-[180px] rounded-md object-cover"
            />
          </div>
  
          {/* Nama dan Deskripsi */}
          <div className="flex flex-col justify-center text-center mt-2">
            <h3 className="text-yellow-500 font-semibold text-xl flex items-center justify-center gap-2">
              {menu.name}
            </h3>
            <p className="text-slate-100 text-sm mt-2 font-Poppins text-left">
              {expandedIndex === menu.menu_id
                ? menu.description
                : `${menu.description.slice(0, 50)}...`}
              <button
                onClick={() => toggleDescription(menu.menu_id)}
                className="text-yellow-300 underline ml-1 flex items-center gap-1"
              >
                {expandedIndex === menu.menu_id ? (
                  <>
                    Tutup <FiChevronsUp />
                  </>
                ) : (
                  <>
                    Baca Selengkapnya <FiChevronsDown />
                  </>
                )}
              </button>
            </p>
          </div>
  
          {/* Harga */}
          <p className="text-yellow-300 font-bold text-xl mt-4 font-Poppins">
            Rp. {menu.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    );
};

export default MenuItem;