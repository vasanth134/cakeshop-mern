import { useEffect, useState } from "react";
import { Loader } from "../../ui/Loader";
import { getAllOrders, orderType, updateStatus } from "../../services/apiOrder";
import { cartType, getCart } from "../../services/apiCart";
import { useNavigate } from "react-router-dom";


export default function ListOrders(){


    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<orderType[] | null>(null);
    const [cartData, setCartData] = useState<{ [orderId: string]: cartType | null }>({});
    const [newStatus,setNewStatus] = useState("")

    const navigate=useNavigate();
  
    useEffect(() => {
      async function fetchOrdersAndCarts() {
        try {
          const orderData = await getAllOrders();
          setOrders(orderData);
  
          const cartPromises = orderData.map(async (order: { cart_id: string; order_id: string; }) => {
            if (order.cart_id) {
              const cart = await getCart(order.cart_id);
              return { orderId: order.order_id, cart };
            }
            return { orderId: order.order_id, cart: null };
          });
  
          const cartResults = await Promise.all(cartPromises);
          const cartMap = cartResults.reduce(
              (acc: { [orderId: string]: cartType | null }, { orderId, cart }: { orderId: string, cart: cartType | null }) => ({
                ...acc,
                [orderId]: cart
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
    },[newStatus]);

    async function handleChange(e:React.ChangeEvent<HTMLSelectElement>,order_id:string){
        e.preventDefault();
        try{
        setNewStatus(e.target.value)
        await updateStatus(order_id,newStatus)
        setOrders((prevOrders) => 
            prevOrders?.map((order) => 
              order.order_id === order_id ? { ...order, status: newStatus } : order
            ) || null
          );
        }
        catch(err){
            console.log(err)
        }
    }


    if(loading) return (<Loader></Loader>)
        
    return(
        <div>

            <div className="ml-32 mr-32 mb-32">
            <div className="pb-7">
                <button className="pt-14 text-lg text-pink-500" onClick={()=>navigate(-1)} >
                <span className="text-xl">&#8249;</span>Back
                </button>
            </div>
            <div className="p-10 bg-white shadow-md h-auto">
                {orders && orders.map((order, key) => (
                <div key={key} className="mb-10">
                    <div className="flex justify-between">
                    <p className="pt-10 text-2xl font-bold">Order #{order.order_id}</p>
                    <div className="pt-10">
                    <select
                        value={order.status}
                        className='border border-pink-200 p-3 rounded-3xl'
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange( e,order.order_id)}
                        >
                            <option value="ordered"> Ordered</option>
                            <option value="pending"> Pending</option>
                            <option value="shipped"> Shipped</option>
                            <option value="delivered"> Delivered</option>

                        </select>
                     </div>
                    </div>

                    <table className="min-w-full mt-5 border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="py-2 px-4 border">Cake Name</th>
                        <th className="py-2 px-4 border">Quantity</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Message on Cake</th>
                        <th className="py-2 px-4 border">Toppings</th>
                        <th className="py-2 px-4 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData[order.order_id]?.cartItems.map((cart_item, idx) => (
                        <tr key={idx} className="border">
                            <td className="py-2 px-4 border">{cart_item.cakeName}</td>
                            <td className="py-2 px-4 border">{cart_item.quantity}</td>
                            <td className="py-2 px-4 border">${cart_item.price}</td>
                            <td className="py-2 px-4 border">
                            {cart_item.message ? cart_item.message : "N/A"}
                            </td>
                            <td className="py-2 px-4 border">
                            {cart_item.toppings.length > 0 ? (
                                cart_item.toppings.map((topping, idx) => (
                                <span key={idx}>{topping}{idx < cart_item.toppings.length - 1 ? ', ' : ''}</span>
                                ))
                            ) : (
                                "N/A"
                            )}
                            </td >
                                
                            <td className="py-2 px-4 border">
                                {order.status}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                ))}
            </div>
            </div>

            
        </div>
    )
}