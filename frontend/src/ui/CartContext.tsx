import { createContext, useReducer } from "react";
import {  cartType } from "../services/apiCart";

export interface cartContextType {
    state: cartType;
    dispatch: React.Dispatch<Action>;
}

export const CartContext = createContext<cartContextType | undefined>(undefined);


type Action =
    | { type: 'ADD_TO_CART'; payload: { cakeName: string; quantity: number; price: number; message: string; toppings: string[]; image: string } }
    | { type: 'UPDATE_CARTID'; payload: { cartid: string; username: string } }
    | { type: 'DELETE_FROM_CART'; payload:string }
    | { type: 'CLEAR_CART'; };


const initialCartState: cartType = {
    cartid: "",
    username: "",
    cartItems: [],
    totalItems: 0,
    totalPrice: 0
};
// Define actions and reducer
const cartReducer = (state: cartType, action: Action): cartType => {
    switch (action.type) {
        case 'ADD_TO_CART':
            {const existingCartItem = state.cartItems.find(
                (item) => item.cakeName === action.payload.cakeName)

            if (existingCartItem) {
                // Update quantity and price if the cake already exists in the cart
                const updatedCartItems = state.cartItems.map((item) =>
                    item.cakeName === action.payload.cakeName
                        ? {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                        }
                        : item
                );

                return {
                    ...state,
                    cartItems: updatedCartItems,
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + action.payload.quantity * action.payload.price,
                };
            } else {
                // If the cake doesn't exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + action.payload.quantity * action.payload.price,
                };
            }
        }
        case 'UPDATE_CARTID':
            return{
                ...state,
                cartid:action.payload.cartid,
                username:action.payload.username
             };
        case 'DELETE_FROM_CART':

        { 
            const existingCartItem = state.cartItems.find(
                (item) => item.cakeName === action.payload
            );
            

            const existingCartItems = state.cartItems.filter(
            (item) => item.cakeName !== action.payload)
            if(existingCartItem)
            {return{
                ...state,
                cartItems:existingCartItems,
                totalItems:state.totalItems - existingCartItem.quantity,
                totalPrice:state.totalPrice - existingCartItem.quantity * existingCartItem.price
             };
            }
            else{
                return state;
            }
        }
        case 'CLEAR_CART':
            return{
                cartid: "",
                username: "",
                cartItems: [],
                totalItems: 0,
                totalPrice: 0
             };

        default:
            return state;
    }
};




export default function CartProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );

}
