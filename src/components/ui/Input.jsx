import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    icon,
    className = '',
    id,
    type = 'text',
    ...props
}) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`input-group ${className}`}>
            {label && <label htmlFor={inputId} className="input-label">{label}</label>}
            <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={inputId}
                    type={type}
                    className={`input-field ${icon ? 'input-with-icon' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default Input;
