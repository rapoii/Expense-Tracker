import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import Card from '../components/ui/Card';
import { CURRENCIES } from '../data/currencies';
import './Settings.css';

const Settings = () => {
    const { settings, toggleTheme, clearAllTransactions, isSyncing, setCurrency } = useTransactions();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleResetData = async () => {
        if (!showConfirm) {
            // First click: show confirmation
            setShowConfirm(true);
            return;
        }

        // Second click: actually clear
        console.log('Clearing all transactions...');
        try {
            await clearAllTransactions();
            console.log('clearAllTransactions completed successfully');
            setShowConfirm(false);
        } catch (error) {
            console.error("Clear Action Failed:", error);
        }
    };

    const handleCancelClear = () => {
        setShowConfirm(false);
    };

    return (
        <div className="settings-page page-container">
            <header className="page-header">
                <h2>Settings</h2>
            </header>

            <section className="settings-section">
                <h3 className="section-title">Appearance</h3>
                <Card className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Dark Mode</span>
                            <span className="setting-desc">Switch between light and dark themes</span>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={settings.theme === 'dark'}
                                onChange={toggleTheme}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </Card>
            </section>

            <section className="settings-section">
                <h3 className="section-title">Preferences</h3>
                <Card className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Currency</span>
                        </div>
                        <select
                            className="setting-select"
                            value={settings.currency || 'IDR'}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            {CURRENCIES.map(c => (
                                <option key={c.code} value={c.code}>
                                    {c.code} - {c.name} ({c.symbol})
                                </option>
                            ))}
                        </select>
                    </div>
                </Card>
            </section>

            <section className="settings-section">
                <h3 className="section-title">Data Management</h3>
                <Card className="settings-card">
                    {!showConfirm ? (
                        <button className="setting-action destructive" onClick={handleResetData} disabled={isSyncing}>
                            {isSyncing ? 'Processing...' : '🗑️ Clear All Data'}
                        </button>
                    ) : (
                        <div className="confirm-actions">
                            <p className="confirm-text">⚠️ Are you sure? This cannot be undone!</p>
                            <div className="confirm-buttons">
                                <button className="btn-cancel" onClick={handleCancelClear}>
                                    Cancel
                                </button>
                                <button className="btn-confirm-delete" onClick={handleResetData} disabled={isSyncing}>
                                    {isSyncing ? 'Deleting...' : 'Yes, Delete All'}
                                </button>
                            </div>
                        </div>
                    )}
                </Card>
            </section>

            <footer className="settings-footer">
                <p>Expense Tracker v1.0.0</p>
                <p>Made with ❤️ by Rapoii</p>
            </footer>
        </div>
    );
};

export default Settings;

