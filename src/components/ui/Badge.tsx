import React, { type HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Badge.module.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'info' | 'error'
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    className,
    variant = 'default',
    ...props
}) => {
    return (
        <span
            className={clsx(styles.badge, styles[variant], className)}
            {...props}
        >
            {children}
        </span>
    )
}
