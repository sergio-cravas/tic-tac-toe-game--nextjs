'use client';

import React from 'react';

interface XIconProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
}

/**
 * Primary UI component for user interaction
 */
export const XIcon = ({
  size = 40,
}: XIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M34.0709 1.51263C32.8993 0.341061 30.9998 0.341061 29.8283 1.51263L20 11.3409L10.1717 1.51264C9.00018 0.341062 7.10068 0.341065 5.9291 1.51264L1.51264 5.92911C0.341064 7.10068 0.341064 9.00017 1.51264 10.1717L11.3409 20L1.51264 29.8283C0.341062 30.9998 0.341065 32.8993 1.51264 34.0709L5.92911 38.4874C7.10068 39.6589 9.00017 39.6589 10.1717 38.4874L20 28.6591L29.8283 38.4874C30.9998 39.6589 32.8993 39.6589 34.0709 38.4874L38.4874 34.0709C39.6589 32.8993 39.6589 30.9998 38.4874 29.8283L28.6591 20L38.4874 10.1717C39.6589 9.00017 39.6589 7.10067 38.4874 5.9291L34.0709 1.51263Z" fill="#31C3BD"/>
    </svg>
  );
};