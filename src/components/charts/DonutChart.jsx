import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';

const DonutChart = ({ data }) => {
    const { settings } = useTransactions();
    // data format: { name: 'Food', value: 50000, color: '#...' }

    if (!data || data.length === 0) {
        return <div className="chart-empty">No expense data</div>;
    }

    const renderTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'var(--bg-card)', padding: '0.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                    <p className="label" style={{ margin: 0, fontWeight: 600 }}>{`${payload[0].name}`}</p>
                    <p className="value" style={{ margin: 0, color: payload[0].payload.color }}>
                        {formatCurrency(payload[0].value, settings.currency)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 300, minWidth: 0, minHeight: 0 }}>
            {/* Remove ResponsiveContainer for now if it causes issues, but usually it's fine */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip content={renderTooltip} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonutChart;
