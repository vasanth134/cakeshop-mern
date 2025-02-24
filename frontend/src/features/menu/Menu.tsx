import { useContext, useEffect, useState } from "react";
import { cakeType, getCakes } from "../../services/apiCakes";
import { Loader } from "../../ui/Loader";
import MenuCard from "./MenuCard";
import { FilterContext } from "../../ui/FilterContext";
import Filters from "../../ui/Filters";

function Menu() {
  const [cakes, setCakes] = useState<cakeType[] | null>();
  const [loading, setLoading] = useState(true);

  const filterProviderValues = useContext(FilterContext);

  if (!filterProviderValues) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { flavor, category, price } = filterProviderValues;

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakes();
        setCakes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  if (loading) return <Loader />;

  const filteredCakes =
    cakes &&
    cakes.filter((cake) => {
      return (
        (flavor ? cake.flavor===flavor : true) &&
        (category ? cake.category === category : true) &&
        (price ? cake.price <= price : true)
      );
    });

  return (
    <div className="pt-4 px-4 sm:px-6 md:px-10">
      {/* Filters Section */}
      <Filters />

      {/* Cake Menu */}
      <div className="min-h-screen pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCakes &&
            filteredCakes.map((cake, index) => (
              <MenuCard key={index} menuItem={cake} />
            ))}
        </div>

        {/* No Cakes Message */}
        {filteredCakes && filteredCakes.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>No cakes match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
