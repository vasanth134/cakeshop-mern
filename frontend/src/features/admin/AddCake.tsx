import { FormEvent, useEffect, useState } from "react";
import Button from "../../ui/Button";
import { categoryType, flavorType, getCategories, getFlavors } from "../../services/apiCakes";
import { Loader } from "../../ui/Loader";
import { Link } from "react-router-dom";

export default function AddCake() {
  const [flavors, setFlavors] = useState<flavorType[] | undefined>();
  const [categories, setCategories] = useState<categoryType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cake");
  const [price, setPrice] = useState(0);
  const [flavor, setFlavor] = useState("chocolate");

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("flavor", flavor);
    formData.append("category", category);
    formData.append("price", price.toString());

    try {
      const res = await fetch("http://localhost:3000/createCake", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create cake");

      await res.json();

      alert("Cake Added Successfully!");

      setCategory("cake");
      setFlavor("chocolate");
      setDescription("");
      setImage(null);
      setName("");
      setPrice(0);
    } catch (err) {
      console.error(err);
      alert("Error adding cake");
    }
  }

  if (loading) return <Loader></Loader>;

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-5 text-pink-500">
          <Link className="hover:underline" to="/adminHome">
            <span className="text-xl">&#8249;</span> Back
          </Link>
        </div>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
          <p className="block text-gray-700 text-2xl sm:text-3xl text-center font-bold mb-4">
            Add Cake
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              value={name}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              value={description}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={category}
              className="border border-pink-200 p-3 rounded-md w-full"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories?.map((category, index) => (
                <option value={category.category} key={index}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Flavor
            </label>
            <select
              value={flavor}
              className="border border-pink-200 p-3 rounded-md w-full"
              onChange={(e) => setFlavor(e.target.value)}
              required
            >
              {flavors?.map((flavor, index) => (
                <option value={flavor.flavor} key={index}>
                  {flavor.flavor}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Price"
              value={price}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button>Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
