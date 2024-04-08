'use client';

import React from 'react';

import styles from './text.module.scss';

type TextColor = 'dark' | 'light' | 'yellow' | 'blue';
type TextVariant = 'heading' | 'body';
type TextSize = 'large' | 'medium' | 'small' | 'extra-small';

interface TextProps {
  /**
   * Classname of the component.
   */
  className?: string;
  /**
   * The variant of the text. By default is BODY
   */
  variant?: TextVariant;
  /**
   * The text size. By default is MEDIUM
   */
  size?: TextSize;
  /**
   * Text content
   */
  content: string;
  /**
   * Text color
   */
  color?: TextColor;
}

/**
 * Primary UI component for user interaction
 */
export const Text = ({ className, variant = 'body', size = 'medium', color = 'light', content }: TextProps) => {
  return (
    <div className={[styles.text, styles[`text--${variant}`], styles[`text--${size}`], styles[`text--${color}`], className].join(' ')}>
      {content}
    </div>
  );
};

export type { TextVariant, TextSize };
