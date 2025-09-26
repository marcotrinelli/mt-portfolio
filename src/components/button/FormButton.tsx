import React from "react";
import "./Button.css";
import { Theme } from "../../theme/Themes";

// FormButton component props for form submission
export interface FormButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  theme?: Theme;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const onMouseEnter = (
  event: React.MouseEvent<HTMLButtonElement>,
  color: string,
  bgColor: string
): void => {
  const el = event.target as HTMLElement;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

const onMouseOut = (
  event: React.MouseEvent<HTMLButtonElement>,
  color: string,
  bgColor: string
): void => {
  const el = event.target as HTMLElement;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

const FormButton: React.FC<FormButtonProps> = ({
  text,
  type = "submit",
  disabled = false,
  className,
  theme,
  onClick,
}) => {
  if (!theme) {
    throw new Error("FormButton component requires theme prop");
  }

  return (
    <div className={className}>
      <button
        className="main-button"
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{
          color: disabled ? theme.secondaryText : theme.body,
          backgroundColor: disabled ? theme.body : theme.text,
          border: `solid 1px ${disabled ? theme.secondaryText : theme.text}`,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
        onMouseEnter={(event) =>
          !disabled && onMouseEnter(event, theme.text, theme.body)
        }
        onMouseOut={(event) =>
          !disabled && onMouseOut(event, theme.body, theme.text)
        }
      >
        {text}
      </button>
    </div>
  );
};

export default FormButton;
