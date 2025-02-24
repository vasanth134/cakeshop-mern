import { useContext, useEffect, useState } from "react";
import { getUserOrder, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";
import { Loader } from "../../ui/Loader";
import { cartType, getCart } from "../../services/apiCart";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const LoginProviderValues = useContext(LoginContext);
  const [orderLoading, setOrderLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [order, setOrder] = useState<orderType | null>(null);
  const [cart, setCart] = useState<cartType | null>(null);
  const navigate = useNavigate();

  if (!LoginProviderValues) {
    return null;
  }

  const { username } = LoginProviderValues;

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getUserOrder(username);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setOrderLoading(false);
      }
    }
    fetchOrder();
  }, [username]);

  useEffect(() => {
    async function fetchCart() {
      try {
        if (order) {
          const cartData = await getCart(order.cart_id);
          setCart(cartData);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setCartLoading(false);
      }
    }
    if (order) fetchCart();
  }, [order]);

  if (orderLoading || cartLoading) return <Loader />;

  if (!order || !cart) {
    return (
      <div className="m-4 sm:m-8 lg:m-16">
        <p>No order or cart data available.</p>
      </div>
    );
  }

  return (
    <div className="m-4 sm:m-8 lg:m-16">
      <div className="pb-7">
        <button
          className="text-lg text-pink-500"
          onClick={() => navigate("/menu")}
        >
          <span className="text-xl">&#8249;</span> Back to Menu
        </button>
      </div>
      <div className="p-6 sm:p-10 bg-white shadow-md rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xl sm:text-3xl font-bold text-center sm:text-left">
            Your Order #{order.order_id} is Confirmed
          </p>
          <div className="bg-pink-500 w-full sm:w-64 h-10 rounded-3xl text-center mt-4 sm:mt-0">
            <p className="text-lg sm:text-xl font-bold text-white pt-1">
              Status: {order.status}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {cart.cartItems.map((cart_item, key) => (
            <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-0 mr-10">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={`http://localhost:3000/images/${cart_item.image}`}
                  alt="Cake"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg sm:text-xl font-bold">
                  {cart_item.cakeName}
                </p>
                <p className="text-gray-600">
                  {cart_item.quantity} x ${cart_item.price.toFixed(2)}
                </p>
                {cart_item.message && (
                  <p className="text-sm sm:text-lg italic">
                    Message on cake: {cart_item.message}
                  </p>
                )}
                <div className="text-sm sm:text-base text-gray-700 mt-2">
                  {cart_item.toppings.map((topping, idx) => (
                    <p key={idx}>• {topping}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
