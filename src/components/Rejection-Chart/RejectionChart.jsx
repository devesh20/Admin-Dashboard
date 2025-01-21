import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Jan', Produced: 500, Rejected: 350 },
    { name: 'Feb', Produced: 480, Rejected: 320 },
    { name: 'Mar', Produced: 510, Rejected: 300 },
    { name: 'Apr', Produced: 550, Rejected: 280 },
    { name: 'May', Produced: 530, Rejected: 260 },
    { name: 'Jun', Produced: 520, Rejected: 250 },
    { name: 'Jul', Produced: 540, Rejected: 270 },
    { name: 'Aug', Produced: 560, Rejected: 240 },
    { name: 'Sep', Produced: 550, Rejected: 230 },
    { name: 'Oct', Produced: 570, Rejected: 220 },
    { name: 'Nov', Produced: 580, Rejected: 210 },
    { name: 'Dec', Produced: 590, Rejected: 200 }
  ];

export default function RejectionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Rejections</strong>
			<div className="mt-3 w-full text-xs h-[22rem]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Produced" fill="#0ea5e9" />
						<Bar dataKey="Rejected" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}