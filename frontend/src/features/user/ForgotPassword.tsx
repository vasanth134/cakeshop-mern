import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../ui/LoginContext";
import Button from "../../ui/Button";
import { updatePassword } from "../../services/apiUsers";

function ForgotPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const LoginProviderValues = useContext(LoginContext);
  if (!LoginProviderValues) {
    return null; // Handles the case where context is not provided
  }

  const { username, setUsername, setPassword } = LoginProviderValues;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await updatePassword(username, newPassword);
    setPassword(newPassword);
    alert("Password change successful");
    navigate("/login");
  }

  return (
    <div className="pt-10 px-4 sm:px-8">
       <div className="mb-5 text-pink-500">
          <Link className="hover:underline" to="/login">
            <span className="text-xl">&#8249;</span> Back
          </Link>
        </div>
    
    <div className="flex items-center justify-center ">
      
      <div className="w-full max-w-md sm:max-w-lg bg-white shadow-md rounded-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <p className="text-gray-700 text-2xl sm:text-3xl text-center font-bold mb-6">
            Change Password
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              value={username}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="New Password"
              value={newPassword}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
            />
          </div>

          <div className="text-center">
            <Button>Update Password</Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
