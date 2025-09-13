import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { dishes } from "./data/mockDishes";
import Filters from "./components/Filters";
import DishList from "./components/DishList";
import IngredientModal from "./components/IngredientModal";
import "./App.css";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("MAIN COURSE");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietFilter, setDietFilter] = useState(null);
  const [selectedDishes, setSelectedDishes] = useState([]); // stores only IDs

  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);

  // dish counts for categories
  const dishCounts = dishes.reduce((acc, dish) => {
    acc[dish.mealType] = (acc[dish.mealType] || 0) + 1;
    return acc;
  }, {});

  // derive selected dish objects (so we can access mealType inside Filters)
  const selectedDishObjects = dishes.filter((d) =>
    selectedDishes.includes(d.id)
  );

  // filter logic
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = dish.mealType === selectedCategory;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDiet =
      dietFilter === null
        ? true
        : dietFilter === "VEG"
        ? dish.type === "VEG"
        : dish.type === "NON-VEG";

    return matchesCategory && matchesSearch && matchesDiet;
  });

  // handlers
  const handleAddDish = (id) => {
    if (!selectedDishes.includes(id)) {
      setSelectedDishes([...selectedDishes, id]);
    }
  };

  const handleRemoveDish = (id) => {
    setSelectedDishes(selectedDishes.filter((dishId) => dishId !== id));
  };

  const handleViewIngredients = (dish) => {
    setCurrentDish(dish);
    setIsIngredientOpen(true);
  };

  const handleViewMore = (dish) => {
    setCurrentDish(dish);
    setIsDetailOpen(true);
  };

  return (
    <div className="app-container">
      {isIngredientOpen && currentDish ? (
        <IngredientModal
          dish={currentDish}
          isOpen={isIngredientOpen}
          onClose={() => setIsIngredientOpen(false)}
        />
      ) : (
        <>
          <Filters
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dietFilter={dietFilter}
            setDietFilter={setDietFilter}
            dishCounts={dishCounts}
            selectedDishes={selectedDishObjects} // ✅ full dish objects
          />

          <DishList
            dishes={filteredDishes}
            selectedDishes={selectedDishes}
            onAddDish={handleAddDish}
            onRemoveDish={handleRemoveDish}
            onViewIngredients={handleViewIngredients}
            onViewMore={handleViewMore}
          />

          {/* Detail Modal */}
          {isDetailOpen && currentDish && (
            <div className="modal-overlay detail-modal">
              <div className="modal-content">
                <button
                  className="close-btn"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <IoClose color="#fff" size={25} />
                </button>
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="modal-img"
                />
                <div className="modal-dish-button">
                  <div className="dish-heading-modal">
                    <h3>{currentDish.name}</h3>
                    <div
                      className={`dot-container ${
                        currentDish.type === "VEG"
                          ? "veg-container"
                          : "non-veg-container"
                      }`}
                    >
                      <span
                        className={`dot ${
                          currentDish.type === "VEG" ? "veg" : "non-veg"
                        }`}
                      ></span>
                    </div>
                  </div>
                  <div className="actions">
                    {selectedDishes.includes(currentDish.id) ? (
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveDish(currentDish.id)}
                      >
                        Remove -
                      </button>
                    ) : (
                      <button
                        className="add-btn"
                        onClick={() => handleAddDish(currentDish.id)}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>

                <p className="modal-description">{currentDish.description}</p>
                <button
                  className="ingredient-btn"
                  onClick={() => handleViewIngredients(currentDish)}
                >
                  🍲 Ingredient
                </button>
              </div>
            </div>
          )}

          <footer>
            <div className="footer-container">
              <div className="footer-text-container">
                <h3>Total Dishes Selected: {selectedDishes.length}</h3>
                <button className="next-btn" type="button">
                  &gt;
                </button>
              </div>
              <button className="continue-btn">Continue</button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
