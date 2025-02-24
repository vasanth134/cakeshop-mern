import { useNavigate } from "react-router-dom";
import Button from "./Button";
import CakeImages from "./CakeImages";
import FeaturedCakes from "./FeaturedCakes";
import Reviews from "./Reviews";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();

  const about =
    "Welcome to The Cake Shop, where every cake is crafted with love, passion, and a sprinkle of magic! We specialize in creating delicious, handcrafted cakes for every occasion, from birthdays to weddings, or even just a little something sweet to brighten your day. Here, we believe in quality and creativity. Using the finest ingredients, our team of expert bakers and decorators work tirelessly to deliver not only a delicious experience but a visually stunning centerpiece for your celebrations. Whether you're looking for a classic flavor or something completely unique, we pride ourselves on offering a wide variety of cakes, including vegan and gluten-free options, ensuring there's something for everyone.";

  return (
    <div>
      {/* Hero Section */}
      <div id="home" className="relative h-screen bg-pink-200 font-poppins overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between h-full px-6 sm:px-8 md:px-10 relative">
          {/* Animated Text Section */}
          <div className="z-10 fade-in text-center md:text-left">
            <p className="text-4xl md:text-6xl font-light text-gray-800 slide-in-left">
              Crafting cakes that
            </p>
            <p className="text-4xl md:text-6xl font-light text-gray-800 mb-6 md:mb-10 slide-in-left">
              steal your heart...
            </p>

            {/* Call-to-Action */}
            <p className="text-lg md:text-2xl font-normal text-gray-700 mb-6 fade-in">
              Our cakes are baked with love and the finest ingredients. <br />
              Place your custom order today and make your celebration even sweeter!
            </p>
            <Button onClick={() => navigate('/menu')}>Explore more!</Button>
          </div>

          {/* Animated Cake Images Section */}
          <div className="relative cake-bounce pt-10 hidden md:block">
            <CakeImages />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="pt-10">
        <div className="text-center border-2 border-pink-200 p-4 mx-6 sm:mx-14">
          <p className="text-2xl md:text-3xl font-poppins">About</p>
          <p className="text-lg sm:text-base md:pl-32 md:pr-32 pt-5">{about}</p>
        </div>
      </div>

      {/* Featured Cakes Section */}
      <div className="px-4 sm:px-8 md:px-10">
        <FeaturedCakes />
      </div>

      {/* Reviews Section */}
      <div id="reviews">
        <Reviews />
      </div>

      {/* Footer Section */}
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
