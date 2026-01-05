import React from 'react';
import './NumPad.css';

const NumPad = ({ onNumber, onDelete, onClear }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];

    return (
        <div className="numpad-container">
            <div className="numpad-grid">
                {numbers.map((num) => (
                    <button
                        key={num}
                        className="numpad-btn"
                        onClick={() => onNumber(num.toString())}
                    >
                        {num}
                    </button>
                ))}
                <button className="numpad-btn numpad-btn-action" onClick={onDelete}>
                    ⌫
                </button>
            </div>
        </div>
    );
};

export default NumPad;
