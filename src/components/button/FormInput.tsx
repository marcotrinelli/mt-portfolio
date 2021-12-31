import React from "react";
import "./FormInput.css";
import { Theme } from "../../theme/Themes";

// FormInput component props
export interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  showRequired?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  theme?: Theme;
  className?: string;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  showRequired = true,
  value,
  onChange,
  theme,
  className,
  label,
}) => {
  if (!theme) {
    throw new Error("FormInput component requires theme prop");
  }

  return (
    <div className={`form-input-container ${className || ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="form-input-label"
          style={{
            color: theme.text,
          }}
        >
          {label}
          {required && showRequired && (
            <span style={{ color: theme.highlight }}> *</span>
          )}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="form-input"
        style={{
          color: theme.text,
          backgroundColor: theme.body,
          border: `2px solid ${theme.secondaryText}`,
          borderRadius: "6px",
        }}
      />
    </div>
  );
};

export default FormInput;
