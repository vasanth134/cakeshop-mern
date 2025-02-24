import { FormEvent, useContext, useEffect, useState } from "react";
import { LoginContext } from "../../ui/LoginContext";
import { getUser, updateUser, userType } from "../../services/apiUsers";
import { Loader } from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProfile() {
  const LoginProviderValues = useContext(LoginContext);
  const navigate = useNavigate();

  if (!LoginProviderValues) {
    return null;
  }

  const { username } = LoginProviderValues;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userType | null>(null);

  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser(username);
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    if (user) {
      setPassword(user.password || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setName(user.name || "");
    }
  }, [user]);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    try {
      await updateUser(username, { password, address, phone, name });
      toast("Profile Updated Successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="mt-10 px-4 sm:px-8 md:px-16 lg:px-24 lg:ml-48 lg:mr-48">
      <div className="pb-7">
        <button
          className="text-lg text-pink-500 flex items-center"
          onClick={() => navigate(-1)}
        >
          <span className="text-xl mr-2">&#8249;</span>Back
        </button>
      </div>
      <div className="p-6 sm:p-8 bg-white shadow-md rounded-md">
        <ToastContainer
          hideProgressBar={true}
          position="bottom-center"
          toastClassName="default-toast"
        />
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={user?.email}
              disabled
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
              pattern="^\d{10}$"
              title="Please enter a valid 10-digit phone number"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
