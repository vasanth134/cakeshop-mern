import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCakeWithName, updateCake } from "../../services/apiCakes";
import Button from "../../ui/Button";

export default function UpdateCake() {
  const { cake } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [flavor, setFlavor] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const data = await getCakeWithName(cake as string);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setFlavor(data.flavor);
        setPrice(data.price);
        setImage(data.image);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCake();
  }, [cake]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedCake = { name, description, category, flavor, price, image };
      await updateCake(updatedCake);
      alert("Cake updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating cake.");
    }
  };

  return (
    <div className="flex items-center justify-center pt-16">

      

      <div className="w-full max-w-lg">

        <div className="mb-5 text-pink-500">
            <Link className="hover:underline" to="/managecakes"> <span className="text-xl">&#8249;</span> Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-3xl text-center font-bold mb-4">Update Cake</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
              type="text"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Flavor</label>
            <input
              type="text"
              value={flavor}
              required
              onChange={(e) => setFlavor(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button>
            Update Cake
          </Button>
        </form>
      </div>
    </div>
  );
}
