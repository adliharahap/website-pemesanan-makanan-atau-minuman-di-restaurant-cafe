import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch, FaUtensils, FaRegClock, FaHeart } from "react-icons/fa";
import { GiForkKnifeSpoon, GiCookingPot, GiMeal } from "react-icons/gi";
import { MdTrendingUp, MdRestaurantMenu } from "react-icons/md";
import SidebarChef from "../../components/Chef/SidebarChef";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";
import { verifyToken } from "../../utils/checkUserToken";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveItem } from "../../redux/slices/sidebarSlice";

const RecipeSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const userData = useSelector((state) => state.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveItem("Resep Makanan"));

    const checkLoginOrNot = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const isValid = await verifyToken(token, dispatch);
        if (isValid) {
          if (userData && userData.role) {
            if (userData.role !== "chef") {
              navigate("/AccesDecline");
            }
          } else {
            console.log("user data not defined", userData, userData.role);
          }
        } else {
          console.log("Token sudah expired");
        }
      } else {
        navigate("/login");
      }
    };
    checkLoginOrNot();
  }, [navigate, userData]);

  // Fetch recommended recipes on component mount
  useEffect(() => {
    fetchRecommendedRecipes();
  }, []);

  const fetchRecommendedRecipes = async () => {
    setLoading(true);
    try {
      // Fetch 20 random meals for recommendations
      const recommendations = [];
      for (let i = 0; i < 4; i++) {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        if (data.meals?.[0]) {
          recommendations.push(data.meals[0]);
        }
      }
      setRecommendedRecipes(recommendations);
    } catch (error) {
      console.error("Gagal mengambil rekomendasi resep:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setSelectedRecipe(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Gagal mengambil data resep:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const RecipeCard = ({ recipe, isRecommended = false }) => (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden"
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      onClick={() => setSelectedRecipe(recipe)}
    >
      {isRecommended && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <MdTrendingUp className="mr-1" />
          Rekomendasi
        </div>
      )}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-green-800 line-clamp-1">
          {recipe.strMeal}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <GiCookingPot className="mr-1" />
          <span>{recipe.strArea || "Local"}</span>
          <span className="mx-2">•</span>
          <MdRestaurantMenu className="mr-1" />
          <span>{recipe.strCategory}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <FaRegClock className="mr-1" />
          <span>30 min</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-red-400 hover:text-red-500"
        >
          <FaHeart />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AnimatePresence>
        <SidebarChef />
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col w-full pt-14 overflow-hidden">
        <NavbarAdmin />
        <div className="p-6 font-Poppins">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
            <GiForkKnifeSpoon className="inline-block mr-2 text-green-600" />
            Resep Masakan Internasional
          </h1>

          {/* Search Section */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-2xl">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Masukkan nama masakan..."
                  className="border rounded-l-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!searchQuery) {
                        setRecipes([]);
                    }
                  }}
                />
                <button
                  onClick={fetchRecipes}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-r-md flex items-center"
                >
                  <FaSearch className="mr-2" />
                  Cari
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Recipes Section */}
          {recommendedRecipes.length > 0 && !searchQuery && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <GiMeal className="mr-2" />
                Rekomendasi Hari Ini
              </h2>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {recommendedRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    isRecommended={true}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Search Results */}
          {loading && (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaUtensils className="text-4xl text-green-500 mx-auto" />
              </motion.div>
              <p className="mt-4 text-green-600">Memuat resep...</p>
            </div>
          )}

          {searchQuery && recipes.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                Hasil Pencarian
              </h2>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </motion.div>
            </div>
          )}

          {/* Recipe Detail Modal */}
          {selectedRecipe && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-11/12 max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full p-2"
                  onClick={() => setSelectedRecipe(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  {selectedRecipe.strMeal}
                </h2>
                <div className="flex items-center mb-6 text-sm text-gray-600">
                  <GiCookingPot className="mr-1" />
                  <span>{selectedRecipe.strArea || "Local"}</span>
                  <span className="mx-2">•</span>
                  <MdRestaurantMenu className="mr-1" />
                  <span>{selectedRecipe.strCategory}</span>
                </div>
                <h3 className="text-lg font-semibold text-green-700 mb-3">
                  Instruksi:
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedRecipe.strInstructions}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchPage;
