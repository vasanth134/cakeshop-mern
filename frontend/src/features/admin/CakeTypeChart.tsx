import { useEffect, useState } from "react";
import { getFlavors } from "../../services/apiCakes";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Define the expected structure of cake flavor data
interface CakeFlavorData {
  flavor: string;
  count: number;
}

const CakeFlavorTypeChart = () => {
  const [flavorData, setFlavorData] = useState<CakeFlavorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CakeFlavorData[] = await getFlavors();
        if (!Array.isArray(data)) {
          console.error("Invalid data format:", data);
          setFlavorData([]); // Prevent errors
        } else {
          setFlavorData(data);
        }
      } catch (error) {
        console.error("Error fetching flavor data:", error);
        setFlavorData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div>
      {flavorData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <BarChart width={600} height={300} data={flavorData}>
          <XAxis dataKey="flavor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default CakeFlavorTypeChart;
