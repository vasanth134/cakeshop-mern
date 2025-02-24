const API_URL="http://localhost:3000"

export interface userType{
    email:string;
    password:string;
    name:string;
    address:string;
    phone:string;
}

export async function getUser(username:string){
  const res = await fetch(`${API_URL}/getUser/${username}`)
  if(!res.ok) throw Error("couldn't find user")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getAllUsers(){
  const res = await fetch(`${API_URL}/getAllUsers`)
  if(!res.ok) throw Error("couldn't find users")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getPassword(username:string){
    const res = await fetch(`${API_URL}/getPassword/${username}`)
    if(!res.ok) throw Error("couldn't find user")
    const data = await res.json();
    console.log(data)
    return data;
}

export async function updatePassword(username:string,password:string){
    try {
        const res = await fetch(`${API_URL}/updatePassword/${username}`, {
          method: 'POST',
          body: JSON.stringify({password}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed updating password');
      }
}

export async function createUser(user:userType){
    try {
        const res = await fetch(`${API_URL}/createUser`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed creating user');
      }
}

export async function createGoogleUser(user:{email:string,name:string}| undefined){
  try {

      const googleUser={
        email:user?.email,
        password:"",
        name:user?.name,
        address:"",
        phone:"",
      }
      const res = await fetch(`${API_URL}/createUser`, {
        method: 'POST',
        body: JSON.stringify(googleUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) throw Error();
      const { data } = await res.json();
      return data;
    } catch {
      throw Error('Failed creating user');
    }
}

export async function updateUser(username: string, updatedDetails: { password?: string; address?: string; phone?: string; name?: string; }) {
  try {
    const res = await fetch(`${API_URL}/updateUser/${username}`, {
      method: 'PUT', 
      body: JSON.stringify(updatedDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorMessage = `Failed to update user details: ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error updating user details');
  }
}


export async function getTopUsers(){
  const res = await fetch(`${API_URL}/topUsers`)
  if(!res.ok) throw Error("couldn't find user")
  const data = await res.json();
  console.log(data)
  return data;
}