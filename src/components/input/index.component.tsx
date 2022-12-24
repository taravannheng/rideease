import { FC, FormEvent, useState } from "react";
import _ from "lodash";

import {
  checkEmail,
  checkPassword,
  checkEmpty,
} from "../../utils/validators/validator";

interface InputProps {
  id: string;
  name: string;
  type: "text" | "password" | "email" | "number";
  placeholder?: "";
  required: boolean;
}

const Input: FC<InputProps> = ({
  id,
  name,
  type,
  placeholder = "",
  required = true,
}) => {
  const [inputState, setInputState] = useState<any>({
    value: "",
    isValid: null,
  });
  const [showSuggestion, setShowSuggestion] = useState(false);

  const inputSuggestionHandler = () => {
    if (type === 'password') {
      setShowSuggestion(true);
    }
  };

  const inputChangeHandler = (e: FormEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const inputVal = inputElement.value;

    // update input
    setInputState({ value: inputVal, isValid: null });
  };

  const inputCheckHandler = () => {
    let isValidInput = null;

    // hide suggestion
    setShowSuggestion(false);

    // check validity
    if (type === "text") {
      isValidInput = checkEmpty(inputState.value);
    }

    if (type === "password") {
      isValidInput = checkPassword(inputState.value);
    }

    if (type === "email") {
      isValidInput = checkEmail(inputState.value);
    }

    // update input
    setInputState({ ...inputState, isValid: isValidInput });
  };

  return (
    <>
      <div className="input">
        <label className="text-neutral-grey-4" htmlFor={id}>{`${_.capitalize(type)}:`}</label>
        <div className="relative">
          <input
            onFocus={inputSuggestionHandler}
            onChange={inputChangeHandler}
            onBlur={inputCheckHandler}
            value={inputState.value}
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`input__field ${
              inputState.isValid === false
                ? "text-status-error"
                : "text-neutral-dark"
            } w-full h-10 bg-neutral-grey-1 text-neutral-dark outline-none px-4 text-body border-primary focus:border-2 z-10 relative`}
            required={required}
          />
          <p className={`input__error-message text-status-error text-body absolute top-0 right-0 transition ${inputState.isValid === false && '-translate-y-6'}`}>Invalid!</p>
        </div>
        {showSuggestion && (
          <div className="input__suggestion bg-neutral-grey-1 p-2 mx-2 my-2">
            <p className="text-sub1 text-neutral-grey-4">{`${_.capitalize(
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
