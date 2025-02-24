import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Dropdown } from "semantic-ui-react";
import { LoginContext } from "./LoginContext";
import { getUser, userType } from "../services/apiUsers";
import {FilterContext} from "./FilterContext";


function UserProfile() {
  const navigate = useNavigate();
  const LoginProviderValues = useContext(LoginContext);
  const FilterProviderValues = useContext(FilterContext);

  const trigger = <Icon name="user circle" size="large" className="cursor-pointer" />;

  if (!LoginProviderValues || !FilterProviderValues) {
    return null;
  }

  const {
    isLogin,
    setIsLogin,
    username,
    isAdmin,
    isGoogleLogin,
    setIsGoogleLogin,
    setIsAdmin
  } = LoginProviderValues;

  const{
    setFlavor,
    setCategory,
    setPrice
  } = FilterProviderValues;

  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser(username);
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    }
    fetchData();
  }, [username]);

  function handleProfileClick() {
    navigate("/updateprofile");
  }

  function handleOrdersClick() {
    navigate("/orders");
  }

  function handleLogout() {
    setIsLogin(false);
    setIsAdmin(false);
    setIsGoogleLogin(false);
    setFlavor("");
    setCategory("");
    setPrice(0);

    navigate("/");
  }

  const options = [
    { key: "name", text: `Hello, ${user?.name || "User"}`, className: "break-words" },
    { key: "profile", text: "Profile", onClick: handleProfileClick },
    { key: "my-orders", text: "Orders", onClick: handleOrdersClick },
    { key: "sign-out", text: "Logout", onClick: handleLogout },
  ];

  const adminOptions = [
    { key: "name", text: `Hello, ${user?.name || "Admin"}` },
    { key: "profile", text: "Profile", onClick: handleProfileClick },
    { key: "sign-out", text: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="relative">
      {(isLogin || isGoogleLogin) && (
        <div className="text-right">
          <Dropdown
            trigger={trigger}
            options={options}
            pointing="top right"
            className="rounded"
          />
        </div>
      )}

      {isAdmin && (
        <div className="text-right">
          <Dropdown
            trigger={trigger}
            options={adminOptions}
            pointing="top right"
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
