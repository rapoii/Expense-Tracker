import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? <span className="loader"></span> : children}
        </button>
    );
};

export default Button;
