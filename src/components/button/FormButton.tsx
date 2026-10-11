import React from "react";
import "./Button.css";

// FormButton component props for form submission
export interface FormButtonProps {
  text: React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  type = "submit",
  disabled = false,
  className,
  onClick,
}) => {
  // Same look as Button
  return (
    <div className={className}>
      <button
        className="main-button main-button-primary"
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default FormButton;
