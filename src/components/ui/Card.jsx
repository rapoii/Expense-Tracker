import React from 'react';
import './Card.css';

const Card = ({ children, className = '', glass = false, onClick }) => {
    return (
        <div
            className={`card ${glass ? 'card-glass' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
