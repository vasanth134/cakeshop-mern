import { useContext } from "react";
import { CartContext } from "../../ui/CartContext";
import CartItem from "./CartItem";
import { cartItemType } from "../../services/apiCart";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  

  const CartProviderValues = useContext(CartContext);


  if (!CartProviderValues) {
    return null;
  }

  const { state } = CartProviderValues;


  function handleCheckout() {
   
    navigate("/checkout");
  }

  if(state.cartItems.length===0){

      return <p className="pt-10  text-pink-500 text-2xl text-center font-bold">Your Cart is Empty!</p>

      
  }

  return (
    <div>
        <div className="min-h-screen flex justify-center">
          <div>
            <button
              className="pt-14 text-lg text-pink-500"
              onClick={() => navigate("/menu")}
            >
              <span className="text-xl">&#8249;</span>Back
            </button>
          </div>
          <div className="w-1/2 text-center">
            <div className="pt-14">
              <p className="text-2xl font-semibold">Shopping Cart</p>
            </div>
            <div className="pt-10 h-auto">
              {state &&
                state.cartItems.map(
                  (cartitem: cartItemType, index: number) => (
                    <CartItem data={cartitem} key={index} />
                  )
                )}
            </div>
            <div className="pt-10 flex items-center justify-between">
              <p className="pl-10 font-semibold text-lg">
                Total Quantity: {state?.totalItems}
              </p>
              <p className="pr-10 font-semibold text-lg">
                Sub Total: ${state?.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="pt-10">
              <Button onClick={handleCheckout}>Checkout</Button>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Cart;
