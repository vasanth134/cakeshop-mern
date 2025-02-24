import { useContext, useEffect, useState } from "react";
import { getAllUserOrders, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";
import { Loader } from "../../ui/Loader";
import { cartType, getCart } from "../../services/apiCart";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const LoginProviderValues = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<orderType[] | null>(null);
  const [cartData, setCartData] = useState<{ [orderId: string]: cartType | null }>({});
  const navigate = useNavigate();

  if (!LoginProviderValues) {
    return null;
  }

  const { username } = LoginProviderValues;

  useEffect(() => {
    async function fetchOrdersAndCarts() {
      try {
        const orderData = await getAllUserOrders(username);
        setOrders(orderData);

        const cartPromises = orderData.map(async (order:orderType) => {
          if (order.cart_id) {
            const cart = await getCart(order.cart_id);
            return { orderId: order.order_id, cart };
          }
          return { orderId: order.order_id, cart: null };
        });

        const cartResults = await Promise.all(cartPromises);
        const cartMap = cartResults.reduce(
          (acc, { orderId, cart }) => ({
            ...acc,
            [orderId]: cart,
          }),
          {} as { [orderId: string]: cartType | null }
        );
        setCartData(cartMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrdersAndCarts();
  }, [username]);

  if (loading) return <Loader />;

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
        {orders &&
          orders.map((order, key) => (
            <div key={key} className="mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="pt-4 text-lg sm:text-2xl font-bold text-center sm:text-left">
                  Order #{order.order_id}
                </p>
                <div className="bg-pink-500 w-full sm:w-64 h-10 rounded-3xl text-center mt-4 sm:mt-0">
                  <p className="text-lg sm:text-xl font-bold text-white pt-1">
                    Status: {order.status}
                  </p>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                {cartData[order.order_id]?.cartItems.map((cart_item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="sm:pr-6">
                      <img
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                        src={`http://localhost:3000/images/${cart_item.image}`}
                        alt="Cake"
                      />
                    </div>
                    <div>
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
                      <div className="text-sm sm:text-base text-gray-700">
                        {cart_item.toppings.map((topping, idx) => (
                          <p key={idx}>• {topping}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderDetails;
