import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { getCakesGroupedByFlavor } from '../../services/apiCakes';

export interface GroupedCakes{
    flavor: string,
    totalCakes: number
}

const CakeFlavorPieChart = () => {
    const [cakes, setCakes] = useState<GroupedCakes[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCakesGroupedByFlavor();
                console.log(data);
                setCakes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = cakes?.map(cake => ({
        flavor: cake.flavor,
        totalCakes: cake.totalCakes,
    }));

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <PieChart width={200} height={200}>
                <Pie 
                    data={chartData} 
                    dataKey="totalCakes" 
                    nameKey="flavor" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                    fill="#8884d8"
                    label
                >
                    {chartData?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                
            </PieChart>
        </div>
    );
};

export default CakeFlavorPieChart;
