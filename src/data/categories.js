export const CATEGORIES = [
    { id: 'food', name: 'Food', icon: 'Utensils' },
    { id: 'transport', name: 'Transport', icon: 'Car' },
    { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag' },
    { id: 'bills', name: 'Bills', icon: 'Zap' },
    { id: 'entertainment', name: 'Fun', icon: 'Gamepad2' },
    { id: 'health', name: 'Health', icon: 'Heart' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'salary', name: 'Salary', icon: 'Wallet' },
    { id: 'other', name: 'Other', icon: 'MoreHorizontal' },
];

export const getCategory = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
