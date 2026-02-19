import React, { type InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className={styles.container}>
                {label && <label className={styles.label}>{label}</label>}
                <div className={styles.inputWrapper}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <input
                        className={clsx(
                            styles.input,
                            error && styles.error,
                            icon && styles.hasIcon,
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        )
    }
)

Input.displayName = 'Input'
