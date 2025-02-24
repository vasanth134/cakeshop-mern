import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoginProvider from "./LoginContext";
import FilterProvider from "./FilterContext";
import CartProvider from "./CartContext";
import OrderProvider from "./OrderContext";


function AppLayout() {
  return (
    <LoginProvider>
      <FilterProvider>
        <CartProvider>
          <OrderProvider>
            <div className="flex flex-col min-h-screen">
              {/* Header */}
              <Header />
              
              {/* Main Content */}
              <div className="flex-1 overflow-auto pt-16"> 
                <main>
                  <Outlet />
                </main>
                
                
              </div>

            </div>
           
          </OrderProvider>
        </CartProvider>
      </FilterProvider>
    </LoginProvider>
  );
}

export default AppLayout;
