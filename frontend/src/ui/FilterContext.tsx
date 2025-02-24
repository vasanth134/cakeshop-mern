import { createContext, useState } from "react";


export interface filterContextType{
    flavor:string;
    setFlavor:React.Dispatch<React.SetStateAction<string>>;
    category:string;
    setCategory:React.Dispatch<React.SetStateAction<string>>;
    price:number;
    setPrice:React.Dispatch<React.SetStateAction<number>>;
}

export const  FilterContext= createContext<filterContextType|undefined>(undefined)

   
export default function FilterProvider({children}:{children:React.ReactNode}){
    const [flavor,setFlavor]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState(0);
    
    return(
        <FilterContext.Provider value={{flavor,setFlavor,category,setCategory,price,setPrice}}>
            {children}
        </FilterContext.Provider>
    )
    
 }