import React, { useState, useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionItem from '../components/TransactionItem';
import Input from '../components/ui/Input';
import { formatRelativeDate, formatDate } from '../utils/dateHelpers';
import { isSameMonth, isSameWeek, parseISO } from 'date-fns';
import './History.css';

const History = () => {
    const { transactions, deleteTransaction } = useTransactions();
    const [filter, setFilter] = useState('month'); // 'all', 'week', 'month'
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            // Search filter
            const matchesSearch =
                t.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category?.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            // Date filter
            const date = parseISO(t.date);
            const now = new Date();

            if (filter === 'week') return isSameWeek(date, now, { weekStartsOn: 1 });
            if (filter === 'month') return isSameMonth(date, now);

            return true;
        });
    }, [transactions, filter, searchQuery]);

    // Group by date
    const groupedTransactions = useMemo(() => {
        const groups = {};
        filteredTransactions.forEach(t => {
            const dateKey = t.date.split('T')[0];
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(t);
        });
        return groups;
    }, [filteredTransactions]);

    const sortedDates = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

    return (
        <div className="history-page page-container">
            <header className="page-header">
                <h2>History</h2>
            </header>

            <div className="history-controls">
                <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon="🔍"
                    className="search-input"
                />

                <div className="filter-tabs">
                    {['week', 'month', 'all'].map(f => (
                        <button
                            key={f}
                            className={`filter-tab ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="history-list">
                {sortedDates.length > 0 ? (
                    sortedDates.map(date => (
                        <div key={date} className="date-group">
                            <h3 className="group-date">{formatRelativeDate(date)}</h3>
                            {groupedTransactions[date].map(t => (
                                <TransactionItem
                                    key={t.id}
                                    transaction={t}
                                    onClick={() => {
                                        if (confirm('Delete this transaction?')) deleteTransaction(t.id);
                                    }}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No transactions found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
