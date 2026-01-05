import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import NumPad from '../components/NumPad';
import CategorySelector from '../components/CategorySelector';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { CURRENCIES } from '../data/currencies';
import './AddTransaction.css';

const AddTransaction = ({ onClose }) => {
    const { addTransaction, settings } = useTransactions();
    const currencySymbol = CURRENCIES.find(c => c.code === settings?.currency)?.symbol || '$';

    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('0');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [step, setStep] = useState(1); // 1: Amount/Cat, 2: Details

    const handleNumPad = (value) => {
        if (value === '.') {
            if (!amount.includes('.')) setAmount(amount + value);
        } else {
            setAmount(amount === '0' ? value : amount + value);
        }
    };

    const handleDelete = () => {
        setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory || parseFloat(amount) === 0) return;

        const newTransaction = {
            id: Date.now().toString(),
            type,
            amount: parseFloat(amount),
            category: selectedCategory,
            date: new Date(date).toISOString(),
            note,
        };

        addTransaction(newTransaction);
        onClose();
    };

    return (
        <div className="add-transaction">
            <div className="type-toggle">
                <button
                    className={`toggle-btn ${type === 'expense' ? 'active expense' : ''}`}
                    onClick={() => setType('expense')}
                >
                    Expense
                </button>
                <button
                    className={`toggle-btn ${type === 'income' ? 'active income' : ''}`}
                    onClick={() => setType('income')}
                >
                    Income
                </button>
            </div>

            <div className="amount-display">
                <span className="currency-symbol">{currencySymbol}</span>
                <span className="amount-value">{amount}</span>
            </div>

            <div className="form-content">
                <div className="category-section">
                    <label className="section-label">Category</label>
                    <CategorySelector
                        selectedId={selectedCategory}
                        onSelect={setSelectedCategory}
                        type={type}
                    />
                </div>

                <div className="details-section">
                    <div className="date-input-wrapper">
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="date-input"
                        />
                    </div>
                    <Input
                        placeholder="Add a note (optional)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <NumPad
                    onNumber={handleNumPad}
                    onDelete={handleDelete}
                />

                <div className="action-buttons">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={!selectedCategory || parseFloat(amount) === 0}
                    >
                        Save Transaction
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
