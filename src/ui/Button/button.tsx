'use client';

import React from 'react';

import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'icon-only';
type ButtonColor = 'yellow' | 'blue' | 'gray';

interface ButtonProps {
  /**
   * The variant of the button. By default is Primary
   */
  variant?: ButtonVariant;
  /**
   * The background color of the button. By default is Yellow
   */
  color?: ButtonColor;
  /**
   * Button content
   */
  label: string | React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ variant = 'primary', color = 'yellow', label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={[styles.button, styles[`button--${variant}`], styles[`button--${color}`]].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

export type { ButtonVariant, ButtonColor };
