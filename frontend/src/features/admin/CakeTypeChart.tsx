import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getCakesGroupedByCategory } from '../../services/apiCakes';

interface TypeGroupedCakes{
    category: string,
    totalCakes: number
}

const CakeFlavorTypeChart = () => {
    const [cakes, setCakes] = useState<TypeGroupedCakes[]|null>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCakesGroupedByCategory();
                console.log(data)
                setCakes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = cakes?.map(cake => ({
        category: cake.category,
        totalCakes: cake.totalCakes,
    }));

    const maxCakes = chartData && Math.max(...chartData.map(d => d.totalCakes));

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <BarChart width={300} height={200} data={chartData}>
                
                <XAxis dataKey="category"/>
                <YAxis ticks={ maxCakes ? [...Array(maxCakes + 1).keys()] : [1,2,3]} domain={[0, 'dataMax + 1']}  />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalCakes" fill="#fbcfe8" name="Number of Cakes"/>
            </BarChart>
        </div>
    );
};


export default CakeFlavorTypeChart; 