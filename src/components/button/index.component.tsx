import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit";
  buttonStyle: "primary" | "secondary" | "text";
  className?: string;
  children: string;
  imageSource?: string;
}

const Button: FC<ButtonProps> = ({ type, buttonStyle, children, className, imageSource }) => {
  let appearance: string;

  switch(buttonStyle) {
    case 'primary': 
      appearance = "bg-primary text-neutral-light hover:bg-primary-dark"
      break;
    case 'secondary':
      appearance = "bg-neutral-grey-1 text-neutral-dark hover:bg-primary hover:text-neutral-light"
      break;
    case 'text':
      appearance = "bg-none text-neutral-dark hover:text-primary"
      break;
    default:
      appearance = "bg-primary text-neutral-light hover:bg-primary-dark"
  }

  return (
    <button
      type={type}
      className={`${appearance} text-body w-full py-3 px-3 border-none container cursor-pointer transition flex flex-row justify-center items-center ${className}`}
    >
      {imageSource && <img src={imageSource} alt="button logo" className="w-6 h-6 mr-2" />} {children}
    </button>
  );
};

export default Button;
