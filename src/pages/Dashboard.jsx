import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import Card from '../components/ui/Card';
import TransactionItem from '../components/TransactionItem';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { transactions, settings } = useTransactions();

    const totalBalance = transactions.reduce((acc, curr) => {
        return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="dashboard page-container">
            <header className="dashboard-header">
                <h1 className="app-title">Expense Tracker</h1>
                <button className="icon-btn">🔔</button>
            </header>

            <Card className="balance-card" glass>
                <span className="balance-label">Total Balance</span>
                <h2 className="balance-amount">{formatCurrency(totalBalance, settings.currency)}</h2>

                <div className="balance-stats">
                    <div className="stat-item">
                        <span className="stat-label">Income</span>
                        <span className="stat-value text-success">
                            {formatCurrency(income, settings.currency)}
                        </span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-label">Expense</span>
                        <span className="stat-value text-danger">
                            {formatCurrency(expense, settings.currency)}
                        </span>
                    </div>
                </div>
            </Card>

            <section className="recent-section">
                <div className="section-header">
                    <h3>Recent Transactions</h3>
                    <Link to="/history" className="view-all-link">View All</Link>
                </div>

                <div className="transaction-list">
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No transactions yet</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
