import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const Filters = ({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  dietFilter,
  setDietFilter,
  dishCounts,
  selectedDishes = [],
}) => {
  const [search, setSearch] = useState("");
  const [categoryWiseSelected, setCategoryWiseSelected] = useState({});

  const categories = [
    { key: "STARTER", label: "Starter" },
    { key: "MAIN COURSE", label: "Main Course" },
    { key: "DESSERT", label: "Dessert" },
    { key: "SIDE", label: "Sides" },
  ];

  // 🔄 Update category-wise selected count
  useEffect(() => {
    if (!selectedDishes || selectedDishes.length === 0) {
      setCategoryWiseSelected({});
    } else {
      const dict = {};
      for (let dish of selectedDishes) {
        dict[dish.mealType] = (dict[dish.mealType] || 0) + 1;
      }
      setCategoryWiseSelected(dict);
    }
  }, [selectedDishes]);

  return (
    <div className="filters">
      {/* 🔍 Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="icon-btn" onClick={() => onSearchChange(search)}>
          <FaSearch size={18} />
        </button>
      </div>

      {/* 🍽️ Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-btn ${cat.key === activeCategory ? "active" : ""}`}
            onClick={() => onCategoryChange(cat.key)}
          >
            {cat.label} {dishCounts[cat.key] || 0}
          </button>
        ))}
      </div>

      {/* ✅ Selected Count */}
      <div className="cuisine-toggle-btn-container">
        <h3 className="cuisine-head">
          {activeCategory} Selected (
          {categoryWiseSelected[activeCategory] || 0})
        </h3>
        <div className="diet-toggle">
            <button
            className={`switch veg ${dietFilter === "VEG" ? "active" : ""}`}
            onClick={() => setDietFilter(dietFilter === "VEG" ? null : "VEG")}
            >
            <span className="dot"></span>
            </button>

            <button
            className={`switch non-veg ${
                dietFilter === "NON-VEG" ? "active" : ""
            }`}
            onClick={() =>
                setDietFilter(dietFilter === "NON-VEG" ? null : "NON-VEG")
            }
            >
            <span className="dot"></span>
            </button>
        </div>
      </div>

      {/* 🌱 Veg / Non-Veg Toggle Switch */}
      
    </div>
  );
};

export default Filters;
