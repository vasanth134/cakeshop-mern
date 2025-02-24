import { useState, useEffect } from "react";

function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      image: "./cake1.jpg",
      name: "Keerthana Aravapalli",
      rating: "5",
      review: "Delicious chocolate cake with rich frosting.",
    },
    {
      image: "./cake2.jpg",
      name: "Manoj Cheruvu",
      rating: "4",
      review: "Best cake I have ever tasted! So moist and flavorful.",
    },
    {
      image: "./cake3.jpg",
      name: "Yamini Aravapalli",
      rating: "5",
      review: "Absolutely loved the rich chocolate flavor and smooth frosting.",
    },
  ];

  const itemsPerPage = 1; // Show 1 review at a time
  const maxIndex = Math.ceil(reviews.length / itemsPerPage) - 1;

  // Automatically slide to the next review every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [maxIndex]);

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-96 px-4 sm:px-8 md:px-10 lg:px-14">
      {/* Reviews Wrapper */}
      <div
        className="flex ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          width: `${reviews.length * 100}%`,
          transition: "transform 1s ease-in-out",
        }}
      >
        {reviews.map((review, i) => (
          <div key={i} className="flex-none w-full flex justify-center px-4 sm:px-10">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-3/4 lg:w-2/3">
              {/* Image and Review Content */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start p-5 sm:p-10">
                <div className="sm:w-1/3 mb-4 sm:mb-0">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-40 h-40 sm:w-64 sm:h-64 object-cover rounded-full mx-auto sm:mx-0"
                  />
                </div>
                <div className="sm:w-2/3 text-center sm:text-left">
                  <h3 className="text-lg text-pink-500 font-bold mb-2">{review.name}</h3>
                  <div className="flex justify-center sm:justify-start items-center mb-4">
                    <span className="text-pink-300 text-xl mr-2">
                      {"★".repeat(parseInt(review.rating))}
                    </span>
                  </div>
                  <p className="text-pink-500">{review.review}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(maxIndex + 1).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-3 w-3 cursor-pointer rounded-full ${
              activeIndex === i ? "bg-pink-800" : "bg-pink-400"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
