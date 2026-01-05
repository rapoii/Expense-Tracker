import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Utensils, Car, ShoppingBag, Zap, Gamepad2, Heart, GraduationCap, Wallet, MoreHorizontal } from 'lucide-react';
import './CategorySelector.css';

// Map string names to components
const IconMap = {
    Utensils, Car, ShoppingBag, Zap, Gamepad2, Heart, GraduationCap, Wallet, MoreHorizontal
};

const CategorySelector = ({ selectedId, onSelect, type = 'expense' }) => {
    const categories = type === 'income'
        ? CATEGORIES.filter(c => ['salary', 'other', 'bills'].includes(c.name.toLowerCase()) || c.id === 'salary' || c.id === 'other')
        : CATEGORIES.filter(c => c.id !== 'salary');

    return (
        <div className="category-grid">
            {categories.map((cat) => {
                const IconComponent = IconMap[cat.icon] || MoreHorizontal;
                return (
                    <button
                        key={cat.id}
                        className={`category-item ${selectedId === cat.id ? 'active' : ''}`}
                        onClick={() => onSelect(cat.id)}
                    >
                        <div className="category-icon-wrapper">
                            <IconComponent size={24} strokeWidth={1.5} />
                        </div>
                        <span className="category-name">{cat.name}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default CategorySelector;
