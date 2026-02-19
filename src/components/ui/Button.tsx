import React, { type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.btn,
                styles[variant],
                size !== 'md' && styles[size],
                fullWidth && styles.full,
                (disabled || loading) && styles.disabled,
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="animate-spin mr-2">⏳</span> // Placeholder spinner
            ) : null}
            {children}
        </button>
    )
}
