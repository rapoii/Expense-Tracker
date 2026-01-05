import { CONFIG } from '../config/config';

export const api = {
    // Fetch all transactions
    async getTransactions() {
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'GET',
                redirect: 'follow'
            });
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('API Error (getTransactions):', error);
            throw error;
        }
    },

    // Save new transaction
    async addTransaction(transaction) {
        try {
            const formData = new FormData();
            Object.entries(transaction).forEach(([key, value]) => {
                if (key !== 'id') formData.append(key, value);
            });

            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('API Error (addTransaction):', error);
            throw error;
        }
    },

    // Delete transaction
    async deleteTransaction(id) {
        try {
            const response = await fetch(`${CONFIG.API_URL}?action=delete&id=${id}`, {
                method: 'GET',
                redirect: 'follow'
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('API Error (deleteTransaction):', error);
            throw error;
        }
    },

    // Clear All Transactions
    async clearAllTransactions() {
        try {
            console.log('Clearing all transactions...');
            const response = await fetch(`${CONFIG.API_URL}?action=clear`, {
                method: 'GET',
                redirect: 'follow'
            });
            const result = await response.json();
            console.log('Clear result:', result);
            return result;
        } catch (error) {
            console.error('API Error (clearAllTransactions):', error);
            throw error;
        }
    }
};
