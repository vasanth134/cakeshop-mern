import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartContext } from "./CartContext";
import UserProfile from "./UserProfile";

function Header() {
  const LoginProviderValues = useContext(LoginContext);
  const CartProviderValues = useContext(CartContext);

  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  if (!LoginProviderValues || !CartProviderValues) {
    return null;
  }

  const { isLogin, isAdmin, isGoogleLogin } = LoginProviderValues;
  const { state } = CartProviderValues;

  return (
    <header className="flex items-center justify-between bg-pink-200 fixed top-0 left-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="pt-5 pb-5 ml-5 flex items-center">
          <Link to="/">
            <img
              src="/logo.png"
              height="40px"
              width="40px"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif ml-4">The Cake Shop</h1>
        </div>
      </div>

      {/* Navbar Links */}
      <div className="flex-1 flex justify-end items-center">
        <div className="sm:hidden flex items-center mr-5">
          <button
            className="text-xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } sm:flex items-center space-x-4 sm:space-x-8 absolute sm:static top-16 left-0 w-full sm:w-auto bg-pink-200 sm:bg-transparent z-40 sm:z-auto`}
        >
          {(!isLogin && !isAdmin && !isGoogleLogin) && (
            <>
              <a
                href="/#home"
                onClick={() => handleTabClick('home')}
                className={`block sm:inline text-lg cursor-pointer py-2 sm:py-0 ${
                  activeTab === 'home' ? 'underline' : ''
                }`}
              >
                Home
              </a>
              <a
                href="/#about"
                onClick={() => handleTabClick('about')}
                className={`block sm:inline text-lg cursor-pointer py-2 sm:py-0 ${
                  activeTab === 'about' ? 'underline' : ''
                }`}
              >
                About
              </a>
              <a
                href="/#reviews"
                onClick={() => handleTabClick('reviews')}
                className={`block sm:inline text-lg cursor-pointer py-2 sm:py-0 ${
                  activeTab === 'reviews' ? 'underline' : ''
                }`}
              >
                Reviews
              </a>
              <Link
                to="/login"
                onClick={() => handleTabClick('login')}
                className={`block sm:inline text-lg cursor-pointer py-2 sm:py-0 ${
                  activeTab === 'login' ? 'underline' : ''
                }`}
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* User and Cart Section */}
      <div className="flex items-center mr-5 sm:mr-10">
        {(isLogin || isGoogleLogin) && (
          <Link
            className="nav-item nav-link flex items-center cursor-pointer"
            to="/cart"
          >
            <i className="fa fa-cart-plus text-xl"></i>
            <span className="ml-1 cart-items">
              {state ? state.totalItems : 0}
            </span>
          </Link>
        )}

        {(isLogin || isAdmin || isGoogleLogin) && (
          <div className="pl-8 pr-12 text-2xl sm:text-3xl">
            <UserProfile />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
