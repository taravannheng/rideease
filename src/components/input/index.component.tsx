import { FC, FormEvent } from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";

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
        <label className="text-neutral-grey-4" htmlFor={id}>{`${
          label !== type ? _.startCase(label) : _.startCase(type)
        }:`}</label>
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
              isValid === false ? "text-status-error" : "text-neutral-dark"
            } relative z-10 h-10 w-full border-primary bg-neutral-grey-1 px-4 text-[16px] text-neutral-dark outline-none focus:border-2`}
            required={required}
          />
          <p
            className={`input__error-message absolute top-0 right-0 text-body text-status-error transition ${
              isValid === false && "-translate-y-6"
            }`}
          >
            {errorMessage}
          </p>
        </div>
        <AnimatePresence>
          {showSuggestion && hideSuggestion === false && (
            <motion.div
              key="input-suggestion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="input__suggestion mx-2 my-2 bg-neutral-grey-1 p-2"
            >
              <p className="text-sub1 text-neutral-grey-4">{`${_.startCase(
                String(type)
              )} should include:`}</p>
              <ul className="list-inside list-disc text-sub1 text-neutral-grey-4">
                <li>at least one uppercase letter</li>
                <li>at least one lowercase letter</li>
                <li>at least one number</li>
                <li>at least one special character</li>
                <li>must be between 8 - 16 characters</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Input;
