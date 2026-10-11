import React from "react";
import "./FormInput.css";

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
  className,
  label,
}) => {
  return (
    <div className={`form-input-container ${className || ""}`}>
      {label && (
        <label htmlFor={id} className="form-input-label">
          {label}
          {required && showRequired && (
            <span className="form-required"> *</span>
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
      />
    </div>
  );
};

export default FormInput;
