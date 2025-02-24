import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cakeType, getCakeWithName } from "../../services/apiCakes";
import { Loader } from "../../ui/Loader";
import Button from "../../ui/Button";
import { LoginContext } from "../../ui/LoginContext";
import { CartContext } from "../../ui/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CakeDetails() {
  const { cake } = useParams<{ cake: string }>();
  const [loading, setLoading] = useState(true);
  const [cakeDetails, setCakeDetails] = useState<cakeType | undefined>();
  const [message, setMessage] = useState("");
  const [qty, setQty] = useState(1);
  const [toppings, setToppings] = useState<string[]>([]);
  const topping_list = [
    "Sprinkles",
    "Chocolate Chips",
    "Whipped Cream",
    "Fresh Berries",
  ];
  const LoginProviderValues = useContext(LoginContext);
  const CartProviderValues = useContext(CartContext);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchCakeDetails() {
      try {
        const data = await getCakeWithName(cake);
        setCakeDetails(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCakeDetails();
  }, [cake]);

  const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setToppings([...toppings, value]);
    } else {
      setToppings(toppings.filter((topping) => topping !== value));
    }
  };

  async function handleClick(e: FormEvent) {
    e.preventDefault();
    if (!cakeDetails || !LoginProviderValues || !CartProviderValues) {
      return;
    }

    const { username } = LoginProviderValues;
    const { state, dispatch } = CartProviderValues;

    if (!state.cartid) {
      const now = new Date();
      const cart_id = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
        now.getHours()
      ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
        now.getSeconds()
      ).padStart(2, "0")}${String(now.getMilliseconds()).padStart(
        3,
        "0"
      )}${String(Math.random() * 1000 + 1)}`;
      dispatch({ type: "UPDATE_CARTID", payload: { username, cartid: cart_id } });
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        cakeName: cakeDetails.name,
        message,
        quantity: qty,
        price: cakeDetails.price,
        toppings,
        image: cakeDetails.image,
      },
    });
    toast("Item added to cart!");
    navigate("/cart")
  }

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 lg:p-10 h-full">
      <div>
        <div className="mb-5 text-pink-500">
          <Link className="hover:underline" to="/menu">
            <span className="text-xl">&#8249;</span> Back
          </Link>
        </div>
        <img
          className="w-full object-cover rounded-lg"
          src={`http://localhost:3000/images/img/${cakeDetails?.image}`}
          alt="Cake"
        />
        <div className="font-thin italic pt-3 text-sm">
          <p>* All cakes are vegan and gluten-free </p>
        </div>
      </div>
      <div>
        <ToastContainer
          hideProgressBar={true}
          position="bottom-center"
          toastClassName="default-toast"
        />
        <form className="pt-16">
          <div className="font-bold text-3xl text-stone-700">
            <h3>{cakeDetails?.name}</h3>
          </div>
          <div className="font-thin italic pt-4">
            <p>{cakeDetails?.description}</p>
          </div>

          <div>
            <p className="font-semibold pt-8 text-pink-500 text-3xl">
            ₹{cakeDetails?.price.toFixed(2)}
            </p>
            <p className="font-thin text-pink-500 italic text-sm">
              + shipping charges
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-10">
            <label className="block text-gray-700 text-base font-semibold mb-2 sm:mr-2">
              Add a Message 📜 :
            </label>
            <input
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="message"
              name="message"
              value={message}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-10">
            <label className="block text-gray-700 text-base font-semibold mb-2 sm:mr-2">
              Select Quantity:
            </label>
            <input
              onChange={(e) => setQty(e.target.valueAsNumber)}
              className="shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              min="1"
              max="10"
              step="1"
              value={qty}
            />
          </div>
          <div className="pt-10">
            <label className="block text-gray-700 text-base font-semibold mb-6">
              Choose Toppings:
            </label>
            <div className="grid grid-cols-2 gap-4">
              {topping_list.map((topping, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={topping}
                    onChange={handleToppingChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700">{topping}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center pt-8">
            <Button onClick={handleClick}>Add to Cart</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CakeDetails;
