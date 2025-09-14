
import './index.css'

const DishCard = ({
  dish,
  isSelected,
  onAddDish,
  onRemoveDish,
  onViewIngredients,
  onViewMore,
}) => {

    
  return (
    <div className="dish-card">
      

      <div className="dish-info">
        <div className="dish-heading">
            <h3>
                {dish.name}
            </h3>
            <div className={`dot-container ${dish.type === "VEG" ? "veg-container" : "non-veg-container"}`}>
                <span className={`dot ${dish.type === "VEG" ? "veg" : "non-veg"}`}></span>
            </div>
        </div>

        <p>
          {dish.description.slice(0, 40)}...
          <button
            className="read-more-btn"
            onClick={() => onViewMore(dish)}
          >
            Read more
          </button>
        </p>

        <button
          className="ingredient-btn"
          onClick={() => onViewIngredients(dish)}
        >
          <img className="ingredient-pic" alt="ingredient" src="https://res.cloudinary.com/da4a06plx/image/upload/v1757746481/Group_1_cuzof1.png"/>
          <p className="ingredient">Ingredient</p>
        </button>
      </div>

      <div className="dish-actions">
        <img src={dish.image} alt={dish.name} className="dish-img" />
        {isSelected ? (
          <button
            className="remove-btn"
            onClick={() => onRemoveDish(dish.id)}
          >
            Remove -
          </button>
        ) : (
          <button
            className="add-btn"
            onClick={() => onAddDish(dish.id)}
          >
            Add +
          </button>
        )}
      </div>
    </div>
  );
};

export default DishCard;
