import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Carousel from "./Carousel";

function FeaturedCakes() {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      {/* Title Section */}
      <div className="pt-10 pb-5">
        <p className="text-2xl sm:text-3xl text-center">Featured Cakes</p>
      </div>

      {/* Carousel Section */}
      <div className="max-w-full overflow-hidden">
        <Carousel />
      </div>

      {/* Button Section */}
      <div className="text-center pt-5">
        <Button onClick={() => navigate('/menu')}>
          Order Now <span className="text-xl sm:text-2xl">&#8250;</span>
        </Button>
      </div>
    </div>
  );
}

export default FeaturedCakes;
