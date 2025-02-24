import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUser } from "../../services/apiUsers";

function CreateUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      name: name,
      address: address,
      phone: phone,
    };

    const data = await getUser(email);
    if (data) {
      alert("Username already exists");
      return;
    }
    await createUser(user);
    alert("Registration Successful!");
    navigate("/login");
  }

  return (

    <div className="pt-20 px-4 sm:px-8">
       <div className="mb-5 text-pink-500">
          <Link className="hover:underline" to="/login">
            <span className="text-xl">&#8249;</span> Back
          </Link>
        </div>
    <div className="flex items-center justify-center ">
      
      <div className="w-full max-w-md sm:max-w-lg bg-white shadow-md rounded-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <p className="text-gray-700 text-2xl sm:text-3xl text-center font-bold mb-6">
            Register New User
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="****"
              value={password}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              onChange={(e)=>{const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setPhone(value);
                  }}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Phone number"
              value={phone}
              
              title="Please enter a valid 10-digit phone number"
              required 
            />
          </div>

          <div className="flex items-center justify-center">
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateUser;
