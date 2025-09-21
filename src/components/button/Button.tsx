import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { Theme } from "../../theme/Themes";

// Button component props
export interface ButtonProps {
  text: string;
  to: string;
  theme?: Theme;
  className?: string;
}

const onMouseEnter = (
  event: React.MouseEvent<HTMLAnchorElement>,
  color: string,
  bgColor: string
): void => {
  const el = event.target as HTMLElement;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

const onMouseOut = (
  event: React.MouseEvent<HTMLAnchorElement>,
  color: string,
  bgColor: string
): void => {
  const el = event.target as HTMLElement;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

const Button: React.FC<ButtonProps> = ({ text, className, to, theme }) => {
  if (!theme) {
    throw new Error("Button component requires theme prop");
  }

  return (
    <div className={className}>
      <Link
        className="main-button"
        to={to}
        style={{
          color: theme.body,
          backgroundColor: theme.text,
          border: `solid 1px ${theme.text}`,
        }}
        onMouseEnter={(event) => onMouseEnter(event, theme.text, theme.body)}
        onMouseOut={(event) => onMouseOut(event, theme.body, theme.text)}
      >
        {text}
      </Link>
    </div>
  );
};

export default Button;
