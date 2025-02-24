import { useContext, useEffect, useState } from "react";
import {
  categoryType,
  flavorType,
  getCategories,
  getFlavors,
} from "../services/apiCakes";
import { Loader } from "./Loader";
import { FilterContext } from "./FilterContext";
import Button from "./Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Icon,
  Button as Btn,
  ModalActions,
} from "semantic-ui-react";

function Filters() {
  const [flavors, setFlavors] = useState<flavorType[] | undefined>();
  const [categories, setCategories] = useState<categoryType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const filterProviderValues = useContext(FilterContext);
  const [open, setOpen] = useState(false);

  if (!filterProviderValues) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { setFlavor, setCategory, setPrice } = filterProviderValues;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFlavors();
        setFlavors(data);
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function ClearFilters() {
    setFlavor("");
    setCategory("");
    setPrice(0);
    setOpen(false);
  }

  if (loading) return <Loader />;

  if (!flavors || !categories) return <p>No filters</p>;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="mt-5 text-right mr-4 sm:mr-8 md:mr-10">
          <Btn className="pink">
            <Icon name="filter" />
            Filters
          </Btn>
        </div>
      }
    >
      <ModalHeader>Filters</ModalHeader>
      <ModalContent>
        {/* Responsive Filter Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Flavor Filter */}
          <div className="w-full sm:w-auto">
            <select
              className="border border-pink-200 p-3 rounded-3xl w-full sm:w-auto"
              onChange={(e) => setFlavor(e.target.value)}
            >
              {flavors.map((flavor, index) => (
                <option value={flavor.flavor} key={index}>
                  {flavor.flavor}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <select
              className="border border-pink-200 p-3 rounded-3xl w-full sm:w-auto"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option value={category.category} key={index}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="w-full sm:w-auto">
            <select
              className="border border-pink-200 p-3 rounded-3xl w-full sm:w-auto"
              onChange={(e) => setPrice(Number(e.target.value))}
            >
              <option value="500">Less than ₹500</option>
              <option value="600">Less than ₹1000</option>
              <option value="700">Less than ₹2000</option>
            </select>
          </div>
        </div>
      </ModalContent>

      {/* Actions */}
      <ModalActions>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-2">
          <Button onClick={() => setOpen(false)}>Apply</Button>
          <Button onClick={ClearFilters}>Clear</Button>
        </div>
      </ModalActions>
    </Modal>
  );
}

export default Filters;
