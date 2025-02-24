import { useContext } from "react";
import { cartItemType } from "../../services/apiCart";
import {CartContext} from "../../ui/CartContext";
import { Popup } from 'semantic-ui-react'

function CartItem({data}:{data:cartItemType} ){

    const CartProviderValues = useContext(CartContext);
    if(!CartProviderValues){
        return
    }
    
    const {state,dispatch}=CartProviderValues;
    const existingCartItem = state.cartItems.find(
        (item) => item.cakeName === data.cakeName)

   function handleIncrement(){
    if(existingCartItem && existingCartItem?.quantity<10){
    dispatch({"type":"ADD_TO_CART","payload":{"cakeName":data.cakeName,"message":data.message,"price":data.price,"quantity":1,"toppings":data.toppings,"image":data.image}})
    }
    }

   function handleDecrement(){
    if(existingCartItem && existingCartItem?.quantity>1){
    dispatch({"type":"ADD_TO_CART","payload":{"cakeName":data.cakeName,"message":data.message,"price":data.price,"quantity":-1,"toppings":data.toppings,"image":data.image}})
    }}

   function handleDelete(){
    dispatch({"type":"DELETE_FROM_CART","payload":data.cakeName})
    if(state.totalPrice===0){
        dispatch({"type":"CLEAR_CART"})
    }
   }

    return (

        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden flex items-center justify-between mt-4">
       
            <div className="flex space-x-3 p-4">
                <img className="w-32 h-32 image-cover " src={`http://localhost:3000/images/${data.image}`} />
                <div>
                    <h3 className="text-lg font-medium italic text-gray-800 pl-4 pr-4 pt-5">{data.quantity}&nbsp;&nbsp; x <span className="text-lg font-semibold text-gray-800 pl-4"> {data.cakeName}</span> </h3>
                    <p className="pt-5 text-left pl-4">$ {(data.quantity * data.price).toFixed(2)}</p>
                </div>
 
            </div>
            <div className="flex ">
                <div className="flex items-center mr-10">
                    
                     <button className="pr-4" onClick={handleDecrement}>-</button><p className="pr-4">{existingCartItem?.quantity}</p><button onClick={handleIncrement}>+</button>
                </div>
                <Popup content='Delete Item' position="top center" trigger={ <button className="pr-4 text-red-600 italic underline" onClick={handleDelete}>Remove</button>} />
               
            </div>
        </div>
    )
}

export default CartItem;