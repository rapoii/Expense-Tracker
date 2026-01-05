import React, { useMemo, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import Card from '../components/ui/Card';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import { getCategory } from '../data/categories';
import { formatCurrency } from '../utils/formatCurrency';
import { subDays, format, parseISO, isSameDay } from 'date-fns';
import './Reports.css';

const Reports = () => {
    const { transactions, settings } = useTransactions();
    const [period, setPeriod] = useState('month'); // placeholder for future period filter

    const expenses = transactions.filter(t => t.type === 'expense');

    // Vibrant Palette for Reports (User Requested)
    const COLORS = [
        '#FF6B6B', // Red
        '#4ECDC4', // Teal 
        '#FFE66D', // Yellow
        '#1A535C', // Dark Teal
        '#FF9F1C', // Orange
        '#2EC4B6', // Cyan
        '#E71D36', // Bright Red
        '#6c5ce7', // Purple
        '#a29bfe', // Light Purple
        '#00cec9', // Aqua
        '#fab1a0', // Salmon
    ];

    // Category Breakdown Data
    const categoryData = useMemo(() => {
        const totals = {};
        expenses.forEach(t => {
            const cat = getCategory(t.category);
            if (!totals[cat.name]) {
                totals[cat.name] = { name: cat.name, value: 0 };
            }
            totals[cat.name].value += t.amount;
        });

        return Object.values(totals)
            .sort((a, b) => b.value - a.value)
            .map((item, index) => ({
                ...item,
                color: COLORS[index % COLORS.length]
            }));
    }, [expenses]);

    // Last 7 Days Data
    const weeklyData = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = subDays(today, i);
            const dayLabel = format(date, 'EEEEE'); // S, M, T...
            const fullDate = format(date, 'dd MMM');

            const dayTotal = expenses
                .filter(t => isSameDay(parseISO(t.date), date))
                .reduce((sum, t) => sum + t.amount, 0);

            days.push({ day: dayLabel, fullDate, amount: dayTotal });
        }
        return days;
    }, [expenses]);

    return (
        <div className="reports-page page-container">
            <header className="page-header">
                <h2>Reports</h2>
            </header>

            <section className="chart-section">
                <h3 className="chart-title">Spending by Category</h3>
                <Card>
                    <DonutChart data={categoryData} />
                </Card>
            </section>

            <section className="chart-section">
                <h3 className="chart-title">Last 7 Days</h3>
                <Card>
                    <BarChart data={weeklyData} />
                </Card>
            </section>

            <section className="top-spending-section">
                <h3 className="chart-title">Top Categories</h3>
                <div className="top-list">
                    {categoryData.slice(0, 3).map((item, index) => (
                        <div key={item.name} className="top-item">
                            <div className="top-item-index text-muted">{index + 1}</div>
                            <div className="top-item-info">
                                <span className="top-item-name">{item.name}</span>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${(item.value / categoryData[0].value) * 100}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                            </div>
                            <span className="top-item-amount">{formatCurrency(item.value, settings.currency)}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Reports;
