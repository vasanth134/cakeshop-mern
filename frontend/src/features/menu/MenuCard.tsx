import { useNavigate } from "react-router-dom";
import { cakeType } from "../../services/apiCakes";

function MenuCard({ menuItem }: { menuItem: cakeType }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/menu/${menuItem.name}`);
  }

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Section */}
      <img
        src={`http://localhost:3000/images/img/${menuItem.image}`}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
        alt={menuItem.name}
      />

      {/* Details Section */}
      <div className="p-4 flex flex-col items-start justify-between space-y-2 sm:space-y-4">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {menuItem.name}
        </h5>
        <p className="text-md sm:text-lg text-pink-500 font-bold">
        ₹{menuItem.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default MenuCard;
