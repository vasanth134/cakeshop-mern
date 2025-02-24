import { useEffect, useState } from "react";
import { getAllUsers, getTopUsers, userType } from "../../services/apiUsers";
import { Loader } from "../../ui/Loader";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

interface TopUsers {
  _id: string;
  totalOrders: number;
}

export default function UserStatistics() {
  const [users, setUsers] = useState<userType[] | null>();
  const [loading, setLoading] = useState(true);
  const [topusers, setTopUsers] = useState<TopUsers[] | null>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
        const topuserdata = await getTopUsers();
        setTopUsers(topuserdata);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  function handleClick() {
    navigate("/viewusers");
  }

  const numUsers = users ? users.length : 0;
  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Number of Users */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Number of Users</h3>
          <p className="text-4xl font-bold mb-2">{numUsers - 1}</p>
          <p className="text-gray-500">Total Registered Users</p>

          <div className="pt-6">
            <Button onClick={handleClick}>View User Details</Button>
          </div>
        </div>

        {/* Top 5 Frequent Users */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Frequent Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-pink-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-pink-200 text-left">
                    Username
                  </th>
                  <th className="py-2 px-4 border-b bg-pink-200 text-left">
                    No. of Orders
                  </th>
                </tr>
              </thead>
              <tbody>
                {topusers?.map((topuser, key) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border-b border-pink-200">
                      {topuser._id}
                    </td>
                    <td className="py-2 px-4 border-b border-pink-200">
                      {topuser.totalOrders}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
