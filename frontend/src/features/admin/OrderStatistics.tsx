import { useEffect, useState } from "react";
import { getOrderStatistics } from "../../services/apiOrder";

interface statType {
  totalOrders: number;
  totalRevenue: number;
  mostOrderedCake: string;
  ordersToday: number;
  uniqueCustomers: number;
  peakOrderingTime: string;
}

export default function OrderStatistics() {
  const [stats, setStats] = useState<statType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getOrderStatistics();
        setStats(data);
      } catch (err) {
        console.error("Error fetching order statistics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No statistics available.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Total Orders</h2>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Total Revenue</h2>
          <p className="text-xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Most Ordered Cake</h2>
          <p className="text-xl font-bold">{stats.mostOrderedCake}</p>
        </div>
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Orders Today</h2>
          <p className="text-xl font-bold">{stats.ordersToday}</p>
        </div>
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Unique Customers</h2>
          <p className="text-xl font-bold">{stats.uniqueCustomers}</p>
        </div>
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-pink-500">Peak Ordering Time</h2>
          <p className="text-xl font-bold">{stats.peakOrderingTime}:00</p>
        </div>
      </div>
    </div>
  );
}
