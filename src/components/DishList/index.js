import React from "react";
import DishCard from "../DishCard";
import './index.css'
const DishList = ({
  dishes,
  selectedDishes,
  onAddDish,
  onRemoveDish,
  onViewIngredients,
  onViewMore,
}) => {
  if (!dishes.length) {
    return <p>No dishes available.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          isSelected={selectedDishes.includes(dish.id)}
          onAddDish={onAddDish}
          onRemoveDish={onRemoveDish}
          onViewIngredients={onViewIngredients}
          onViewMore={onViewMore}
        />
      ))}
    </div>
  );
};

export default DishList;
