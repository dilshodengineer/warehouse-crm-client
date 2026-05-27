import React from 'react';

function Input({

    type = 'text',
    name = '',
    id = '',
    label = '',
    placeholder = '',
    className = '',

    value = '',
    onChange = () => {},
    disabled = false,

    }) {
    return (
        <div>
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`input ${className}`.trim()}
            />
        </div>
    );
}

export default Input;