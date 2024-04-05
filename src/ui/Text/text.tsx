'use client';

import React from 'react';

import styles from './text.module.scss';

type TextColor = 'dark' | 'light';
type TextVariant = 'heading' | 'body';
type TextSize = 'large' | 'medium' | 'small' | 'extra-small';

interface TextProps {
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
export const Text = ({ variant = 'body', size = 'medium', color = 'light', content }: TextProps) => {
  return (
    <div className={[styles.text, styles[`text--${variant}`], styles[`text--${size}`], styles[`text--${color}`]].join(' ')}>
      {content}
    </div>
  );
};

export type { TextVariant, TextSize };
