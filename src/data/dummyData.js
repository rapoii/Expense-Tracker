export const DUMMY_TRANSACTIONS = [
    {
        id: '1',
        title: 'Nasi Goreng',
        amount: 25000,
        type: 'expense',
        category: 'food',
        date: new Date().toISOString(), // Today
        note: 'Makan siang di warteg',
    },
    {
        id: '2',
        title: 'Gaji Bulanan',
        amount: 5000000,
        type: 'income',
        category: 'salary',
        date: new Date(new Date().setDate(1)).toISOString(), // 1st of this month
        note: 'Gaji Januari',
    },
    {
        id: '3',
        title: 'Grab Car',
        amount: 45000,
        type: 'expense',
        category: 'transport',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        note: 'Ke kantor',
    },
    {
        id: '4',
        title: 'Belanja Bulanan',
        amount: 750000,
        type: 'expense',
        category: 'shopping',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        note: 'Supermarket',
    },
];
