import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../ui/LoginContext";
import { FormEvent, useContext } from "react";
import { createGoogleUser, getPassword, getUser } from "../../services/apiUsers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Divider, Icon } from "semantic-ui-react";
import { Button as SemanticButton } from "semantic-ui-react";

function Login() {
  const navigate = useNavigate();

  const LoginProviderValues = useContext(LoginContext);
  if (!LoginProviderValues) {
    return null;
  }

  const {
    setGoogleProfile,
    username,
    setUsername,
    password,
    setPassword,
    setIsLogin,
    setIsAdmin,
    setIsGoogleLogin,
  } = LoginProviderValues;

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    const data = await getPassword(username);

    if (username === "admin@gmail.com" && password === "password") {
      setIsAdmin(true);
      navigate("/adminhome");
    } else if (data.toString() === password) {
      setIsLogin(true);
      navigate("/menu");
    } else {
      toast.error("Invalid Credentials");
      setUsername("");
      setPassword("");
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      setIsGoogleLogin(true);

      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const data = await res.json();
        console.log(data);

        // Set the Google profile state and the username
        setGoogleProfile({ email: data.email, name: data.name });
        setUsername(data.email);

        const user = await getUser(data.email);

        // After setting the profile, directly pass the data to createGoogleUser
        if (user == null) {
          createGoogleUser({ email: data.email, name: data.name });
        }

        console.log("User's Email:", data.email);
        console.log("User's Name:", data.name);

        // Navigate after setting the user info
        navigate("/menu");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div className="flex items-center justify-center mt-20 px-4 sm:px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8">
        <ToastContainer
          hideProgressBar={true}
          position="top-center"
          toastClassName="error-toast"
        />
        <form className="mb-6" onSubmit={handleLogin}>
          <p className="text-gray-700 text-2xl sm:text-3xl font-bold text-center mb-6">
            Login
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              required
            />
          </div>
          <div className="mb-6">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button>Sign In</Button>
            <Link
              className="text-pink-500 hover:text-pink-800 text-sm font-bold"
              to="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="text-center flex justify-center">
          <p>
            New User?{" "}
            <Link to="/createuser" className="font-bold text-pink-500">
              SignUp
            </Link>
          </p>
        </div>

        <Divider horizontal className="pt-5">
          Or
        </Divider>

        <div className="text-center pt-5">
          <SemanticButton onClick={() => login()} color="pink">
            <Icon name="google" />
            Continue with Google
          </SemanticButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
