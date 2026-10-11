import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

// Button component props
export interface ButtonProps {
  text: string;
  to: string;
  className?: string;
  external?: boolean; // plain link for files and other sites, outside the hash router
  variant?: "primary" | "secondary"; // secondary is outlined, for the less important action
  arrow?: boolean; // trailing arrow, for actions that lead to another page
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  to,
  external,
  variant = "primary",
  arrow,
  onClick,
}) => {
  const linkProps = {
    className: `main-button main-button-${variant}`,
    onClick,
  };
  const label = (
    <>
      {text}
      {arrow && <LuArrowRight className="main-button-arrow" aria-hidden />}
    </>
  );

  return (
    <div className={className}>
      {external ? (
        <a {...linkProps} href={to} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link {...linkProps} to={to}>
          {label}
        </Link>
      )}
    </div>
  );
};

export default Button;
