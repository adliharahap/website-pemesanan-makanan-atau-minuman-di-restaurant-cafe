import React, { Suspense, useEffect, useState } from "react";
import { FiSearch, FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import axios from "axios";

// Lazy loading untuk MenuList component
const MenuList = React.lazy(() => import("./MenuItem"));

const HomeMenuList = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [allMenu, setAllMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  const getAllMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/get-all-menu"
      );
      if (response.data && response.data.success) {
        setAllMenu(response.data.data);
      } else {
        console.error("Data tidak sesuai:", response.data);
      }
    } catch (error) {
      console.log("Gagal mendapatkan menu:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderMenuSection = (type) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {allMenu
          .filter((menu) => menu.Type === type)
          .map((menu) => (
            <MenuList
              key={menu.menu_id}
              menu={menu}
              expandedIndex={expandedIndex}
              toggleDescription={toggleDescription}
            />
          ))}
      </Suspense>
    );
  };

  const renderFilteredMenu = () => {
    const filteredMenus = allMenu.filter(
      (menu) =>
        menu.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <MenuList
              key={menu.menu_id}
              menu={menu}
              expandedIndex={expandedIndex}
              toggleDescription={toggleDescription}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Tidak ada menu yang cocok.
          </div>
        )}
      </Suspense>
    );
  };

  return (
    <div>
      {/* Input Pencarian */}
      <div className="w-full flex justify-between px-12">
        <div className="flex justify-center items-center">
          <h2 className="text-yellow-500 text-3xl font-semibold font-Poppins">
            {!searchTerm ? "Makanan" : "Hasil Pencarian"}
          </h2>
        </div>
        <div className="relative">
            <input
            type="text"
            placeholder="Cari menu..."
            className="w-72 py-2 px-4 border-gray-300 border-[1.5px] bg-transparent rounded-md text-white font-Poppins outline-none placeholder:text-white"
            value={searchTerm}
            onChange={handleSearchChange}
            />
            <FiSearch className="absolute top-3 right-3 text-white" />
        </div>
      </div>

      {/* Render Menu */}
      <div className="w-full px-8">
        {!searchTerm ? (
          <>
            <div className="grid grid-cols-5 pt-12">
              {renderMenuSection("Makanan")}
            </div>
            <div className=" w-full pt-12 text-left px-4">
                <h2 className="text-yellow-500 text-3xl font-semibold font-Poppins">
                    Minuman
                </h2>
            </div>
            <div className="grid grid-cols-5 pt-12">
              {renderMenuSection("Minuman")}
            </div>
          </>
        ) : (
            <>
                <div className="grid grid-cols-5 pt-12">
                {renderFilteredMenu()}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default HomeMenuList;
