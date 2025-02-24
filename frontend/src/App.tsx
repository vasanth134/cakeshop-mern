import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Login from "./features/user/Login";
import Menu from "./features/menu/Menu";
import ForgotPassword from "./features/user/ForgotPassword";
import CreateUser from "./features/user/CreateUser";
import CakeDetails from "./features/menu/CakeDetails";
import Checkout from "./features/order/Checkout";
import Cart from "./features/cart/Cart";
import '@fontsource/poppins'; 
import 'semantic-ui-css/semantic.min.css';
import OrderDetails from "./features/order/OrderDetails";
import UpdateProfile from "./features/user/UpdateProfile";
import Orders from "./features/order/Orders";
import AdminHome from "./features/admin/AdminHome";
import ViewUsers from "./features/admin/ViewUsers";
import ListOrders from "./features/admin/ListOrders";
import AddCake from "./features/admin/AddCake";
import ManageCakes from "./features/admin/ManageCakes";
import UpdateCake from "./features/admin/UpdateCake";


const router=createBrowserRouter([
 { element:<AppLayout></AppLayout>,
    children:[{
      path:'/',
      element:<Home/>
    },
  {
    path:'/menu',
    element:<Menu></Menu>
  },
  {
    path:'/menu/:cake',
    element:<CakeDetails></CakeDetails>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/forgotpassword',
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:'/createuser',
    element:<CreateUser></CreateUser>
  },
  {
    path:'/cart',
    element:<Cart></Cart>
  },
  {
    path:'/checkout',
    element:<Checkout></Checkout>
  },
  {
    path:'/orderdetails',
    element:<OrderDetails></OrderDetails>
  },
  {
    path:'/updateprofile',
    element:<UpdateProfile></UpdateProfile>
  },
  {
    path:'/orders',
    element:<Orders></Orders>
  },
  {
    path:'/adminhome',
    element:<AdminHome></AdminHome>
  },
  {
    path:'/viewusers',
    element:<ViewUsers></ViewUsers>
  },
  {
    path:'/listorders',
    element:<ListOrders></ListOrders>
  },
  {
    path:'/addcake',
    element:<AddCake></AddCake>
  },
  {
    path:'/managecakes',
    element:<ManageCakes></ManageCakes>
  },
  {
    path: '/updatecake/:cake',
    element: <UpdateCake></UpdateCake>
  }
  ] 
}])

function App() {
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
