import React from "react";
import "./FormTextarea.css";
import { Theme } from "../../theme/Themes";

// FormTextarea component props
export interface FormTextareaProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  showRequired?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  theme?: Theme;
  className?: string;
  label?: string;
  rows?: number;
  cols?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  placeholder,
  required = false,
  showRequired = true,
  value,
  onChange,
  theme,
  className,
  label,
  rows = 5,
  cols,
}) => {
  if (!theme) {
    throw new Error("FormTextarea component requires theme prop");
  }

  return (
    <div className={`form-textarea-container ${className || ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="form-textarea-label"
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
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className="form-textarea"
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

export default FormTextarea;
