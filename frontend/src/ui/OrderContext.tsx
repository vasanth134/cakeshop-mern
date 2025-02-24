import { createContext, useReducer } from "react";
import ShippingDetails from "../features/order/ShippingDetails";

export interface ShippingDetails
{
    name:string,
    phone:string,
    address:string,
    delivery:string
}

export interface PaymentDetails
{
    card_number:string,
    name:string,
    security_code:string,
    expiry:string
}

interface orderState{
    is_shipping:boolean;
   shipping_details:ShippingDetails;
   payment_details:PaymentDetails;
}

export interface orderContextType {
    state: orderState;
    dispatch: React.Dispatch<Action>;
}

export const OrderContext = createContext<orderContextType | undefined>(undefined);


type Action =
    | { type: 'UPDATE_SHIPPING'; payload: { name: string; phone: string; address: string; delivery: string; is_shipping:boolean } }
    | { type: 'UPDATE_PAYMENT'; payload: { card_number: string; name: string, security_code:string, expiry: string; is_shipping:boolean } }
    | {type:'SET_SHIPPING'; payload:boolean}


const initialOrderState:orderState = {
   is_shipping:true,
   shipping_details:{name:"",address:"",phone:"",delivery:""},
   payment_details:{card_number:"",name:"",security_code:"",expiry:""}
};

const orderReducer = (state: orderState, action: Action): orderState => {
    switch (action.type) {
        case 'UPDATE_SHIPPING':
            
                return {
                    ...state,
                    shipping_details:{name:action.payload.name,     
                                       address:action.payload.address,
                                       phone:action.payload.phone,
                                       delivery:action.payload.delivery
                                        },
                    is_shipping:action.payload.is_shipping
                };

        case 'UPDATE_PAYMENT':
            return{
                ...state,
                    payment_details:{name:action.payload.name,     
                                       card_number:action.payload.card_number,
                                       security_code:action.payload.security_code,
                                       expiry:action.payload.expiry
                                        },   
                    is_shipping: action.payload.is_shipping
             };
        case 'SET_SHIPPING':
            return{
                ...state,
                is_shipping:action.payload
            }
       
        default:
            return state;
    }
};

export default function OrderProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(orderReducer, initialOrderState);

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );

}
