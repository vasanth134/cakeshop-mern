import { useEffect, useState } from "react"
import { getAllUsers, userType } from "../../services/apiUsers";
import { Loader } from "../../ui/Loader";

export default function ViewUsers(){

    const [users,setUsers]=useState<userType[]|null>();
    const [loading, isLoading]=useState(true);

    useEffect(()=>{
        async function fetchUsers(){

            try{
                const data = await getAllUsers();
                setUsers(data); 
                console.log(data)
            }
            catch(err){
                console.log(err);
            }
            finally{
                isLoading(false)
            }

        }
        fetchUsers()

    },[])

    if(loading) return (<Loader></Loader>)

    return (
       
        <div className="p-20">
             <table className="min-w-full border border-pink-200">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b bg-pink-200 text-left">Email/Username</th>
                        <th className="py-2 px-4 border-b bg-pink-200 text-left">Name</th>
                        <th className="py-2 px-4 border-b bg-pink-200 text-left">Address</th>
                        <th className="py-2 px-4 border-b bg-pink-200 text-left">Phone</th>
                        <th className="py-2 px-4 border-b bg-pink-200 text-left">Password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users?.map((user, key) => (
                        <tr key={key}>
                            <td className="py-2 px-4 border-b border-pink-200">{user.email}</td>
                            <td className="py-2 px-4 border-b border-pink-200">{user.name}</td>
                            <td className="py-2 px-4 border-b border-pink-200">{user.address}</td>
                            <td className="py-2 px-4 border-b border-pink-200">{user.phone}</td>
                            <td className="py-2 px-4 border-b border-pink-200">{user.password}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
    )
}