import { GroupedCakes } from "../features/admin/CakeFlavorChart";

const API_URL="http://localhost:3000"

export interface cakeType{
    name:string;
    image:string;
    description:string;
    flavor:string;
    category:string;
    price:number;
}

export interface flavorType{
  flavor:string;
}

export interface categoryType{
  category:string;
}

export async function getCakeWithName(name:string|undefined){
    if(!name){
        name="Chocolate cake"
    }
    const res = await fetch(`${API_URL}/getCake/${name}`)
    if(!res.ok) throw Error("couldn't find cake")
    const data = await res.json();
    console.log(data)
    return data;
}


export async function deleteCakeWithName(name:string|undefined){
 if(!name){
  return;
 }
  const res = await fetch(`${API_URL}/deleteCake/${name}`)
  if(!res.ok) throw Error("couldn't find cake")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getCakes(): Promise<cakeType[]>{
    const res = await fetch(`${API_URL}/getCakes`)
    if(!res.ok) throw Error("couldn't find cake")
    const data = await res.json();
    console.log(data)
    return data;
}
  

export async function getFlavors(){
    const res = await fetch(`${API_URL}/getFlavors`)
    if(!res.ok) throw Error("couldn't find flavors")
    const data = await res.json();
    console.log(data)
    return data;
}

export async function getCategories(){
  const res = await fetch(`${API_URL}/getCategories`)
  if(!res.ok) throw Error("couldn't find categories")
  const data = await res.json();
  console.log(data)
  return data;
}


export async function getCakesGroupedByFlavor(): Promise<GroupedCakes[]>{
  const res = await fetch(`${API_URL}/getCakesGroupedByFlavor`)
  if(!res.ok) throw Error("couldn't find flavors")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getCakesGroupedByCategory(){
  const res = await fetch(`${API_URL}/getCakesGroupedByCategory`)
  if(!res.ok) throw Error("couldn't find categories")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function createCake(cake:cakeType){
  try {
      const res = await fetch(`${API_URL}/createCake`, {
        method: 'POST',
        body: JSON.stringify(cake),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) throw Error();
      const { data } = await res.json();
      return data;
    } catch {
      throw Error('Failed creating cake');
    }
}

export async function updateCake(cake: cakeType): Promise<void> {
  try {
    const res = await fetch(`http://localhost:3000/updateCake`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cake),
    });
    if (!res.ok) throw new Error("Failed to update cake");
  } catch {
    throw new Error("Error updating cake");
  }
}


