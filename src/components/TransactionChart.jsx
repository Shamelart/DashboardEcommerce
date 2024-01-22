import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../../transactionSlice'; // Asegúrate de que la ruta sea correcta
import { selectChartData } from '../../transactionSlice'; // Asegúrate de que la ruta sea correcta
import { useEffect } from 'react';


export default function TransactionChart() {
	const dispatch = useDispatch();
  
	useEffect(() => {
	dispatch(fetchChartData()); // Despacha la acción
	}, [dispatch]);
  
	const barChart = useSelector(selectChartData);
	console.log(barChart); // Imprime los datos seleccionados  

	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={barChart}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Income" fill="#0aa139" />
						<Bar dataKey="Expense" fill="#00c0ff" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
