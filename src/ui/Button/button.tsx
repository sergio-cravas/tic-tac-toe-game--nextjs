"use client";

import React from "react";

import { classNames } from "@/functions/classNames";

import styles from "./button.module.scss";

type ButtonVariant = "primary" | "secondary" | "icon-only";
type ButtonColor = "yellow" | "blue" | "gray";

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
   * Sets the button with disabled state. By default is false.
   */
  isDisabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ variant = "primary", color = "yellow", label, isDisabled = false, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames([
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${color}`],
        isDisabled && styles[`button--disabled`],
      ])}
      {...props}
    >
      {label}
    </button>
  );
};

export type { ButtonVariant, ButtonColor };
