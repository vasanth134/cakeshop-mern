import { PaymentDetails, ShippingDetails } from "../ui/OrderContext";

const API_URL="http://localhost:3000"

export interface orderType{
    username : string;
    shipping_data : ShippingDetails;
    payment_data : PaymentDetails;
    cart_id : string;
    status: string;
    order_id: string;
}

export async function insertOrder(order:orderType){
    try {
        const res = await fetch(`${API_URL}/insertOrder`, {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed creating order');
      }

}

export async function getUserOrder(username:string){
    try{
        const res = await fetch(`${API_URL}/getUserOrder/${username}`)
        if(!res.ok) throw Error("couldn't find order")
        const data = await res.json();
        console.log(data)
        return data;
    }
    catch{
        throw Error('Failed fetching order');
    }
}

export async function getAllUserOrders(username:string){
  try{
      const res = await fetch(`${API_URL}/getAllUserOrders/${username}`)
      if(!res.ok) throw Error("couldn't find orders")
      const data = await res.json();
      console.log(data)
      return data;
  }
  catch{
      throw Error('Failed fetching order');
  }
}

export async function getAllOrders(){
  try{
      const res = await fetch(`${API_URL}/getAllOrders`)
      if(!res.ok) throw Error("couldn't find orders")
      const data = await res.json();
      console.log(data)
      return data;
  }
  catch{
      throw Error('Failed fetching order');
  }
}


export async function updateStatus(order_id:string,status:string){
  try {
      const res = await fetch(`${API_URL}/updateStatus/${order_id}`, {
        method: 'POST',
        body: JSON.stringify({status}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) throw Error();
      const { data } = await res.json();
      console.log(data)
      return data;
    } catch {
      throw Error('Failed updating password');
    }
}

export async function getOrderStatistics() {
  const res = await fetch("http://localhost:3000/orderStatistics");
  if (!res.ok) throw new Error("Failed to fetch order statistics");
  return res.json();
}

