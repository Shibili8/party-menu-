
import { FaLessThan } from "react-icons/fa";
import './index.css'

const IngredientModal = ({ dish, isOpen, onClose }) => {
  if (!isOpen || !dish) return null;
    
  return (
    <div className="modal-ingredient">
      <div className="modal-content-ingredient">
        <div className="ingredient-sub-heading-container">
            <button className="close-btn-ingredient" onClick={onClose}>
                <FaLessThan size={13}/>
            </button>
            <h3 className="heading-ingredient">Ingredient List</h3>
        </div>
        
        <h2>{dish.name}</h2>
        <img src={dish.image} alt={dish.name} className="modal-img-ingredient" />
        <p>{dish.description}</p>
        <h3 className="ingredient-sub-heading">Ingredients</h3>
        <p className="serve-count"> {"for "} {dish.serves} {" people"}</p>
        <ul className="ingredient-list-container">
          {dish.ingredientList.map((ing, i) => (
            <li key={i} className="list-items">
                <p>{ing.name}</p>
                <p>{ing.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientModal;
