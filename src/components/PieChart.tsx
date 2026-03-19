import '../css/Graph.css';
import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Expense } from '../types';

interface PieChartProps {
  expenses: Expense[];
  budget: number;
}

function PieChartComponent({ expenses, budget }: PieChartProps) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#AAAAAA'];

    const expenseData = Object.values(
        expenses.reduce((acc: Record<string, { name: string; value: number }>, expense) => {
            if (!acc[expense.label]) acc[expense.label] = { name: expense.label, value: 0 };
            acc[expense.label].value += expense.amount;
            return acc;
        }, {})
    );

    const totalExpenses = expenseData.reduce((sum, e) => sum + e.value, 0);
    const remaining = budget - totalExpenses;

    const chartData = remaining > 0 
        ? [...expenseData, { name: 'Remaining', value: remaining }]
        : expenseData;

    return (
        <div className='PieChart'>
            <label>Pie Chart</label>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    labelLine={false}
                    >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
}

export default PieChartComponent;
