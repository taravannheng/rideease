import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit";
  buttonStyle: "primary" | "secondary" | "text";
  className?: string;
  children: string;
}

const Button: FC<ButtonProps> = ({ type, buttonStyle, children, className }) => {
  let appearance: string;

  switch(buttonStyle) {
    case 'primary': 
      appearance = "bg-primary text-neutral-light"
      break;
    case 'secondary':
      appearance = "bg-neutral-grey-1 text-neutral-dark"
      break;
    case 'text':
      appearance = "bg-none text-neutral-dark"
      break;
    default:
      appearance = "bg-primary text-neutral-light"
  }

  return (
    <button
      type={type}
      className={`${appearance} w-full py-2 px-3 border-none container cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
