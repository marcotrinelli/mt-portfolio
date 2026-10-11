import React from "react";
import "./FormTextarea.css";

// FormTextarea component props
export interface FormTextareaProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  showRequired?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  className,
  label,
  rows = 5,
  cols,
}) => {
  return (
    <div className={`form-textarea-container ${className || ""}`}>
      {label && (
        <label htmlFor={id} className="form-textarea-label">
          {label}
          {required && showRequired && (
            <span className="form-required"> *</span>
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
      />
    </div>
  );
};

export default FormTextarea;
