import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatRelativeDate } from '../utils/dateHelpers';
import { getCategory } from '../data/categories';
import { Utensils, Car, ShoppingBag, Zap, Gamepad2, Heart, GraduationCap, Wallet, MoreHorizontal } from 'lucide-react';
import './TransactionItem.css';

const IconMap = {
    Utensils, Car, ShoppingBag, Zap, Gamepad2, Heart, GraduationCap, Wallet, MoreHorizontal
};

const TransactionItem = ({ transaction, onClick }) => {
    const { settings } = useTransactions();
    const { category: catId, title, amount, date, type, note } = transaction;
    const category = getCategory(catId);
    const isExpense = type === 'expense';

    const IconComponent = IconMap[category.icon] || MoreHorizontal;

    return (
        <div className="transaction-item" onClick={onClick}>
            <div className="transaction-icon-box">
                <IconComponent size={20} className="transaction-icon-svg" />
            </div>

            <div className="transaction-details">
                <div className="flex-between">
                    <h4 className="transaction-title">{title || category.name}</h4>
                    <span className={`transaction-amount ${isExpense ? '' : 'text-success'}`}>
                        {isExpense ? '-' : '+'}{formatCurrency(amount, settings.currency)}
                    </span>
                </div>
                <div className="flex-between">
                    <span className="transaction-date">
                        {formatRelativeDate(date)} {note && `• ${note}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
