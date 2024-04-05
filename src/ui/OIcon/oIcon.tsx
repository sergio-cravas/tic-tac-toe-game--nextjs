'use client';

import React from 'react';

interface OIconProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
}

/**
 * Primary UI component for user interaction
 */
export const OIcon = ({
  size = 40
}: OIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M39.9631 19.8383C39.9631 8.88189 31.0812 0 20.1249 0C9.16851 0 0.286621 8.88189 0.286621 19.8383C0.286621 30.7946 9.16851 39.6765 20.1249 39.6765C31.0812 39.6765 39.9631 30.7946 39.9631 19.8383ZM12.0426 19.8383C12.0426 15.3745 15.6612 11.756 20.1249 11.756C24.5886 11.756 28.2071 15.3745 28.2071 19.8383C28.2071 24.302 24.5886 27.9205 20.1249 27.9205C15.6612 27.9205 12.0426 24.302 12.0426 19.8383Z" fill="#F2B137"/>
    </svg>
  );
};