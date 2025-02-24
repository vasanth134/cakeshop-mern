import { useState } from 'react';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  

  // Image data
  const images = [
    {
      src: "./cake1.jpg",
      alt: "Image 1",
      description: 'Delicious chocolate cake with rich frosting.'
    },
    {
      src: "./cake2.jpg",
      alt: "Image 2",
      description: 'Delicious chocolate cake with rich frosting.'
    },
    {
      src: "./cake3.jpg",
      alt: "Image 3",
      description: 'Delicious chocolate cake with rich frosting.'
    },
    {
      src: "./cake1.jpg",
      alt: "Image 4",
      description: 'Delicious chocolate cake with rich frosting.'
    },
    {
      src: "./cake2.jpg",
      alt: "Image 5",
      description: 'Delicious chocolate cake with rich frosting.'
    },
    {
      src: "./cake3.jpg",
      alt: "Image 6",
      description: 'Delicious chocolate cake with rich frosting.'
    }
  ];

  const itemsPerPage = 3; // Show 3 images at a time
  const maxIndex = Math.ceil(images.length / itemsPerPage) - 1;

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? maxIndex : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === maxIndex ? 0 : activeIndex + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">

      {/* Images Wrapper */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, i) => (
          <div key={i} className="flex-none w-1/3 px-3 rounded-sm hover:scale-105">
            <div className="overflow-hidden shadow-md rounded-sm">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 mx-auto object-cover rounded-sm"
              />
            </div>
          </div>
        ))}
      </div>

       {/* Navigation Arrows */}
       <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-pink-500 text-7xl p-2 rounded-sm hover:bg-slate-200 opacity-60 transition"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 font-bold right-2 transform -translate-y-1/2 text-pink-500 text-7xl p-2 rounded-sm hover:bg-slate-200 opacity-60 transition"
      >
        &#8250;
      </button>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(maxIndex + 1).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-2 w-2 cursor-pointer rounded-full ${activeIndex === i ? "bg-pink-800" : "bg-pink-400"}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Carousel;
