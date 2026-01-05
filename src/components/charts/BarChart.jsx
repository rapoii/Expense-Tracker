import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';

const BarChart = ({ data }) => {
    const { settings } = useTransactions();
    // data: [{ day: 'M', fullDate: '...', amount: 50000 }, ...]

    const renderTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'var(--bg-card)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p className="label" style={{ margin: 0, fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{payload[0].payload.fullDate}</p>
                    <p className="value" style={{ margin: '0.25rem 0 0', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                        {formatCurrency(payload[0].value, settings.currency)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 200, marginTop: '1rem', minWidth: 0, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}
                        dy={10}
                    />
                    <Tooltip content={renderTooltip} cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 4 }} />
                    <Bar dataKey="amount" radius={[4, 4, 4, 4]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
                        ))}
                    </Bar>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6c5ce7" stopOpacity={1} />
                            <stop offset="100%" stopColor="#a29bfe" stopOpacity={0.5} />
                        </linearGradient>
                    </defs>
                </ReBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
