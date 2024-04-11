"use client";

import React from "react";

import colors from "@/theme/colors.module.scss";

type OIconVariant = "solid" | "outline";

interface OIconProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
  /**
   * The style variant of the Icon. By default is "solid".
   */
  variant?: OIconVariant;
  /**
   * Optional color of the icon. By default is light blue.
   */
  color?: string;
  /**
   * Classname of the component
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const OIcon = ({ size = 40, variant = "solid", color = colors.lightYellow, className }: OIconProps) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      {variant === "solid" && (
        <path
          fill={color}
          d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        />
      )}

      {variant === "outline" && (
        <path
          fill="none"
          stroke={color}
          strokeWidth="2"
          d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        />
      )}
    </svg>
  );
};
