import { CartContext } from "../../ui/CartContext";
import { cartType, insertCart } from "../../services/apiCart";
import { OrderContext } from "../../ui/OrderContext";
import { LoginContext } from "../../ui/LoginContext";
import { useContext } from "react";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import { Link } from "react-router-dom";

function Checkout() {
  const CartProviderValues = useContext(CartContext);
  const LoginProviderValues = useContext(LoginContext);
  const OrderProviderValues = useContext(OrderContext);

  if (!CartProviderValues || !LoginProviderValues || !OrderProviderValues) {
    return null;
  }

  const { state, dispatch } = CartProviderValues;
  const { username } = LoginProviderValues;
  const { state: order_state, dispatch: order_dispatch } = OrderProviderValues;

  function handleCart() {
    try {
      const cart: cartType = {
        cartid: state.cartid,
        username: username,
        cartItems: state.cartItems,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      };
      insertCart(cart);
      dispatch({ type: "CLEAR_CART" });
    } catch (err) {
      console.log(err);
    }
  }

  function handleBackClick() {
    order_dispatch({ type: "SET_SHIPPING", payload: true });
  }

  const shipping = (state.totalPrice * 15) / 100;
  const taxes = (state.totalPrice * 5) / 100;
  const total = state.totalPrice + shipping + taxes;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 lg:gap-10 m-5 lg:m-20">
      <div>
      <div className="mb-5 text-pink-500">
          <Link className="hover:underline" to="/cart">
            <span className="text-xl">&#8249;</span> Back
          </Link>
        </div>
        <div className="bg-white shadow-md h-auto p-5">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 justify-center pt-10 px-4">
            <div
              className={`flex items-center space-x-4 ${
                order_state.is_shipping
                  ? "text-pink-500 font-bold text-xl"
                  : "text-gray-400"
              }`}
            >
              <p>Shipping</p>
              <div className="hidden lg:block w-72 pt-4">
                <hr />
              </div>
            </div>

            <div
              className={`${
                !order_state.is_shipping
                  ? "text-pink-500 font-bold text-xl"
                  : "text-gray-400"
              }`}
            >
              <p>Payment</p>
            </div>
          </div>
          <div className="pt-10 px-4 lg:px-10">
            {order_state.is_shipping && <ShippingDetails />}
            {!order_state.is_shipping && (
              <PaymentDetails
                handleClick={handleCart}
                handleBackClick={handleBackClick}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md h-64 lg:h-[300px] pt-5 px-5">
        <div className="pb-2">
          <p className="text-2xl lg:text-3xl font-bold">Order Summary</p>
        </div>
        <hr />
        <div className="flex pt-2 justify-between pb-2 text-sm lg:text-base">
          <p>{state.totalItems} item(s) in cart</p>
          <Link to="/cart" className="text-pink-500 underline">
            Details
          </Link>
        </div>
        <hr />
        <div className="pt-2 pb-2 text-sm lg:text-base">
          <div className="flex justify-between">
            <p>Order Subtotal</p>
            <p>${state.totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Charges</p>
            <p>${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Taxes</p>
            <p>${taxes.toFixed(2)}</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between pt-3 text-base lg:text-2xl font-bold">
          <p>Order Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
