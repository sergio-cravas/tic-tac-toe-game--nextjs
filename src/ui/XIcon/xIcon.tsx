"use client";

import React from "react";

import colors from "@/theme/colors.module.scss";

type XIconVariant = "solid" | "outline";

interface XIconProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
  /**
   * The style variant of the Icon. By default is "solid".
   */
  variant?: XIconVariant;
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
export const XIcon = ({ size = 40, variant = "solid", color = colors.lightBlue, className }: XIconProps) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {variant === "solid" && (
        <path
          fill={color}
          fillRule="evenodd"
          d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
        />
      )}

      {variant === "outline" && (
        <path
          fill="none"
          stroke={color}
          strokeWidth="2"
          d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
        />
      )}
    </svg>
  );
};

export type { XIconVariant };
