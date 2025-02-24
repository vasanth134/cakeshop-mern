const CakeImages = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Cake Image 1 - Left */}
      <div className="relative transform -rotate-6 -translate-x-20 hover-bounce">
        <img
          src="/cake1.jpg"
          alt="Cake 1"
          className="rounded-full border-4 border-white w-72 h-72 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Cake Image 2 - Center */}
      <div className="relative -mt-16 z-10 hover-bounce">
        <img
          src="/cake2.jpg"
          alt="Cake 2"
          className="rounded-full border-4 border-white w-80 h-80 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Cake Image 3 - Right */}
      <div className="relative transform rotate-6 -translate-x-20 -mt-16 hover-bounce">
        <img
          src="/cake3.jpg"
          alt="Cake 3"
          className="rounded-full border-4 border-white w-72 h-72 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default CakeImages;
