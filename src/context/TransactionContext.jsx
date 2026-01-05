import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { loadTransactions, saveTransactions, loadSettings, saveSettings } from '../utils/localStorage';
import { DUMMY_TRANSACTIONS } from '../data/dummyData';
import { api } from '../services/api';
import { CONFIG } from '../config/config';

const TransactionContext = createContext();

const initialState = {
    transactions: [],
    settings: loadSettings(),
    isLoading: true,
    isSyncing: false,
    syncError: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TRANSACTIONS':
            return { ...state, transactions: action.payload, isLoading: false };
        case 'ADD_TRANSACTION':
            // Store locally as well
            if (!CONFIG.USE_BACKEND) {
                const newTransactions = [action.payload, ...state.transactions];
                saveTransactions(newTransactions);
                return { ...state, transactions: newTransactions };
            }
            return { ...state, transactions: [action.payload, ...state.transactions] };

        case 'DELETE_TRANSACTION':
            if (!CONFIG.USE_BACKEND) {
                const filteredTransactions = state.transactions.filter(t => t.id !== action.payload);
                saveTransactions(filteredTransactions);
                return { ...state, transactions: filteredTransactions };
            }
            return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };

        case 'CLEAR_TRANSACTIONS':
            saveTransactions([]);
            return { ...state, transactions: [] };

        case 'SET_THEME':
            const newSettingsTheme = { ...state.settings, theme: action.payload };
            saveSettings(newSettingsTheme);
            return { ...state, settings: newSettingsTheme };
        case 'SET_CURRENCY':
            const newSettingsCurrency = { ...state.settings, currency: action.payload };
            saveSettings(newSettingsCurrency);
            return { ...state, settings: newSettingsCurrency };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_SYNCING':
            return { ...state, isSyncing: action.payload };
        case 'SET_SYNC_ERROR':
            return { ...state, syncError: action.payload };
        default:
            return state;
    }
};

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Initial Load
    useEffect(() => {
        const fetchAndLoad = async () => {
            // 1. Load Settings (Always local)
            dispatch({ type: 'SET_THEME', payload: state.settings.theme });
            // Ensure currency is set, default to IDR if missing
            if (!state.settings.currency) {
                dispatch({ type: 'SET_CURRENCY', payload: 'IDR' });
            }

            // 2. Load Transactions
            if (CONFIG.USE_BACKEND) {
                try {
                    dispatch({ type: 'SET_LOADING', payload: true });
                    const remoteData = await api.getTransactions();

                    // Format dates if necessary or just use as is
                    // Google Sheets might return dates as ISO strings or similar
                    // Sanitize data: Ensure amount is Number and date is String
                    const sanitizedData = remoteData.map(item => {
                        // Handle "Rp 5.000" or similar string formats safely
                        let amountVal = item.amount;
                        if (typeof amountVal === 'string') {
                            // Remove "Rp", dots, spaces, commas if needed
                            // Adjust regex based on expected format. Assuming "5000" or "5.000" (if thousands) or "5000.00"
                            // safest is to just keep digits and maybe one dot? 
                            // If input was "5000" it's fine. If "Rp 5.000", strip Rp.
                            // If "5.000" means 5000, we should strip dot.
                            // But usually API returns raw number if cell is number. 
                            // If cell is text "Rp 5.000", we need to clean.
                            amountVal = parseFloat(amountVal.toString().replace(/[^0-9.-]+/g, ""));
                        }

                        return {
                            ...item,
                            amount: Number(amountVal) || 0,
                            date: typeof item.date === 'string' ? item.date : new Date(item.date).toISOString()
                        };
                    });

                    dispatch({ type: 'LOAD_TRANSACTIONS', payload: sanitizedData });
                } catch (error) {
                    console.error("Failed to load from backend, falling back to local", error);
                    dispatch({ type: 'SET_SYNC_ERROR', payload: 'Failed to load data from server.' });

                    // Fallback to local
                    const saved = loadTransactions();
                    dispatch({ type: 'LOAD_TRANSACTIONS', payload: saved.length ? saved : DUMMY_TRANSACTIONS });
                } finally {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            } else {
                // Local only mode
                const saved = loadTransactions();
                if (saved.length > 0) {
                    dispatch({ type: 'LOAD_TRANSACTIONS', payload: saved });
                } else {
                    dispatch({ type: 'LOAD_TRANSACTIONS', payload: DUMMY_TRANSACTIONS });
                    saveTransactions(DUMMY_TRANSACTIONS);
                }
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchAndLoad();
    }, []);

    // Theme effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', state.settings.theme);
    }, [state.settings.theme]);

    const addTransaction = async (transaction) => {
        if (CONFIG.USE_BACKEND) {
            try {
                dispatch({ type: 'SET_SYNCING', payload: true });
                dispatch({ type: 'SET_SYNC_ERROR', payload: null });

                // Optimistic Update can be tricky if ID comes from server
                // So we wait for server response
                const result = await api.addTransaction(transaction);
                console.log('Add transaction result:', result);

                // Accept multiple response formats: { success: true } or { result: 'success' }
                if (result && (result.success === true || result.result === 'success' || result.id)) {
                    // Use server logic for ID if provided, else use local timestamp (fallback)
                    const newTx = { ...transaction, id: result.id || transaction.id };
                    dispatch({ type: 'ADD_TRANSACTION', payload: newTx });
                } else {
                    throw new Error(result?.error || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to add transaction', error);
                dispatch({ type: 'SET_SYNC_ERROR', payload: 'Failed to save transaction.' });
                // Optional: Store in a "pending sync" queue
            } finally {
                dispatch({ type: 'SET_SYNCING', payload: false });
            }
        } else {
            dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
        }
    };

    const deleteTransaction = async (id) => {
        if (CONFIG.USE_BACKEND) {
            try {
                dispatch({ type: 'SET_SYNCING', payload: true });
                dispatch({ type: 'SET_SYNC_ERROR', payload: null });

                const result = await api.deleteTransaction(id);
                console.log('Delete transaction result:', result);

                // Accept multiple response formats
                if (result && (result.success === true || result.result === 'success')) {
                    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
                } else {
                    throw new Error(result?.error || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to delete transaction', error);
                dispatch({ type: 'SET_SYNC_ERROR', payload: 'Failed to delete transaction.' });
            } finally {
                dispatch({ type: 'SET_SYNCING', payload: false });
            }
        } else {
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        }
    };

    const clearAllTransactions = async () => {
        if (CONFIG.USE_BACKEND) {
            try {
                dispatch({ type: 'SET_SYNCING', payload: true });
                dispatch({ type: 'SET_SYNC_ERROR', payload: null });

                const result = await api.clearAllTransactions();
                console.log('Clear all result:', result);

                // Accept multiple response formats
                if (result && (result.success === true || result.result === 'success')) {
                    dispatch({ type: 'CLEAR_TRANSACTIONS' });
                } else {
                    throw new Error(result?.error || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to clear transactions', error);
                dispatch({ type: 'SET_SYNC_ERROR', payload: 'Failed to clear transactions.' });
            } finally {
                dispatch({ type: 'SET_SYNCING', payload: false });
            }
        } else {
            dispatch({ type: 'CLEAR_TRANSACTIONS' });
        }
    };

    const toggleTheme = () => {
        dispatch({ type: 'SET_THEME', payload: state.settings.theme === 'light' ? 'dark' : 'light' });
    };

    const setCurrency = (currencyCode) => {
        dispatch({ type: 'SET_CURRENCY', payload: currencyCode });
    };

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            settings: state.settings,
            isLoading: state.isLoading,
            isSyncing: state.isSyncing,
            syncError: state.syncError,
            addTransaction,
            deleteTransaction,
            clearAllTransactions,
            toggleTheme,
            setCurrency
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
};
