import { OIcon } from "../OIcon/oIcon";
import { XIcon } from "../XIcon/xIcon";

interface LogoProps {
  /**
   * The size of the icon in pixels. By default is 40.
   */
  size?: number;
}

export const Logo = ({ size = 40 }: LogoProps) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: size / 4 }}>
        <XIcon size={size} />
        <OIcon size={size} />
      </div>
    );
  };
  