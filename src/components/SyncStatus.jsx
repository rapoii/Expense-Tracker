import React, { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import './SyncStatus.css';

const SyncStatus = () => {
    const { isSyncing, syncError } = useTransactions();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isSyncing || syncError) {
            setIsVisible(true);

            // Auto hide error after 5 seconds
            if (syncError && !isSyncing) {
                const timer = setTimeout(() => {
                    setIsVisible(false);
                }, 5000);
                return () => clearTimeout(timer);
            }
        } else {
            // Delay hiding success to avoid flickering
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isSyncing, syncError]);

    if (!isVisible && !isSyncing && !syncError) return null;

    const isError = !!syncError;

    return (
        <div className={`sync-status ${isVisible ? 'visible' : ''} ${isError ? 'error' : 'syncing'}`}>
            {isError ? (
                <>
                    <span>⚠️ {syncError}</span>
                </>
            ) : (
                <>
                    <div className="sync-spinner"></div>
                    <span>Syncing with server...</span>
                </>
            )}
        </div>
    );
};

export default SyncStatus;
