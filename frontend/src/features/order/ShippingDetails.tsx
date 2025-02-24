import Button from "../../ui/Button";
import { useState,useContext, FormEvent } from "react";
import { OrderContext } from "../../ui/OrderContext";
import { toast,ToastContainer } from "react-toastify";


function ShippingDetails(){

    const inputStyle="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const labelStyle="block text-gray-700 text-sm font-bold mb-2 text-left"
   
    const OrderProviderValues = useContext(OrderContext);
    if(!OrderProviderValues){
        return
    }
    const {state,dispatch}=OrderProviderValues;
    const [name,setName]=useState(state.shipping_details.name);
    const [phone,setPhone]=useState(state.shipping_details.phone);
    const [address,setAddress]=useState(state.shipping_details.address);
    const [delivery,setDelivery]=useState(state.shipping_details.delivery);
    

    function nextClick(e:FormEvent){
        e.preventDefault()
        if (!name || !phone || !address || !delivery) {
            toast.error("All fields are required!");
            return;
          }
      
        dispatch({"type":"UPDATE_SHIPPING","payload":{"name":name,"address":address,"phone":phone,"delivery":delivery,"is_shipping":false}})
    }

    return(
        
        <div className="flex justify-center items-center">
        <ToastContainer
          hideProgressBar={true}
          position="bottom-center"
          toastClassName="default-toast"
        />
        <div className="w-1/2">
            <form className="space-y-4">
                <div className=" mb-4">
                    <label className={labelStyle}>Name</label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" required  className={inputStyle} value={name}/>
                </div>

                <div className="mb-4">
                    <label className={labelStyle}>Phone</label>
                    <input onChange={(e)=>{const value = e.target.value;
      if (/^\d{0,10}$/.test(value)) {
        setPhone(value);
        }}} type="text" required className={inputStyle} value={phone}  pattern="^\d{10}"
                            title="Please enter a valid 10-digit phone number"/>
                </div>

                <div className=" mb-4">
                    <label className={labelStyle}>Address</label>
                    <input onChange={(e)=>setAddress(e.target.value)} type="text" required className={inputStyle} value={address} />
                </div>

                <div className="  mb-4">
                    <label className={labelStyle}>Delivery Date</label>
                    <input onChange={(e)=>setDelivery(e.target.value)} type="date" required className={inputStyle} value={delivery} min={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className="pt-10 text-right">
                <Button onClick={nextClick}>Next</Button>
                </div>
            </form>
        </div>
        </div>
        
    )
}

export default ShippingDetails;