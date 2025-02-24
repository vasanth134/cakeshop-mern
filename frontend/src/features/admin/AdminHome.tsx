import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CakeFlavorChart from "./CakeFlavorChart";
import CakeTypeChart from "./CakeTypeChart";
import UserStatistics from "./UserStatistics";
import OrderStatistics from "./OrderStatistics";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-pink-200">
      <div className="p-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Number of Users */}
          <div className="bg-white rounded-lg p-6">
            <UserStatistics />
          </div>

          {/* Update Order Status */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-14">Update Order Status</h3>
            <Button onClick={() => navigate("/listorders")}>Update Order Status</Button>
          </div>

          {/* Add/Update Cakes */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Manage Cake Availability</h3>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button onClick={() => navigate("/addcake")}>Add Cake</Button>
              <Button onClick={() => navigate("/managecakes")}>
                View/Update Cake Availability
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <CakeFlavorChart />
              <CakeTypeChart />
            </div>
          </div>

          {/* Order Statistics */}
          <div className="bg-white rounded-lg p-6">
            <OrderStatistics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
