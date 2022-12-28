import { FC, FormEvent, useState } from "react";
import _ from "lodash";

import { checkEmpty } from "../../utils/validators/validator";

interface InputProps {
  id: string;
  value: string;
  isValid: null | boolean;
  name: string;
  type: "text" | "password" | "email" | "number";
  label?: string;
  placeholder?: string;
  className?: string;
  required: boolean;
  hideSuggestion?: boolean;
  onChange: (e: FormEvent) => void;
  onBlur: (e: FormEvent) => void;
  onFocus: (e: FormEvent) => void;
  errorMessage?: string;
  showSuggestion: boolean;
}

const Input: FC<InputProps> = ({
  id,
  value,
  isValid,
  name,
  type,
  placeholder = "",
  className = "",
  required = true,
  label = type,
  hideSuggestion = false,
  errorMessage = "Invalid!",
  showSuggestion,
  onChange,
  onBlur,
  onFocus,
}) => {

  return (
    <>
      <div className={`input ${className}`}>
        <label className="text-neutral-grey-4" htmlFor={id}>{`${label !== type ? _.startCase(label) : _.startCase(type)}:`}</label>
        <div className="relative">
          <input
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`input__field ${
              isValid === false
                ? "text-status-error"
                : "text-neutral-dark"
            } w-full h-10 bg-neutral-grey-1 text-neutral-dark outline-none px-4 text-body border-primary focus:border-2 z-10 relative`}
            required={required}
          />
          <p className={`input__error-message text-status-error text-body absolute top-0 right-0 transition ${isValid === false && '-translate-y-6'}`}>{errorMessage}</p>
        </div>
        {showSuggestion && hideSuggestion === false && (
          <div className="input__suggestion bg-neutral-grey-1 p-2 mx-2 my-2">
            <p className="text-sub1 text-neutral-grey-4">{`${_.startCase(
              String(type)
            )} should include:`}</p>
            <ul className="text-sub1 text-neutral-grey-4 list-disc list-inside">
              <li>at least one uppercase letter</li>
              <li>at least one lowercase letter</li>
              <li>at least one number</li>
              <li>at least one special character</li>
              <li>must be between 8 - 16 characters</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
