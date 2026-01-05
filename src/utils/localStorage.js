const KEYS = {
    TRANSACTIONS: 'expense_tracker_transactions',
    SETTINGS: 'expense_tracker_settings',
};

export const saveTransactions = (transactions) => {
    try {
        localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error saving transactions:', error);
    }
};

export const loadTransactions = () => {
    try {
        const data = localStorage.getItem(KEYS.TRANSACTIONS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading transactions:', error);
        return [];
    }
};

export const saveSettings = (settings) => {
    try {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

export const loadSettings = () => {
    try {
        const data = localStorage.getItem(KEYS.SETTINGS);
        return data ? JSON.parse(data) : { theme: 'light', currency: 'IDR' };
    } catch (error) {
        return { theme: 'light', currency: 'IDR' };
    }
};
