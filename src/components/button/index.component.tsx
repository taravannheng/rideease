import { FC } from "react";
import { Link } from "react-router-dom";
interface ButtonProps {
  id?: string,
  type: "button" | "submit";
  buttonStyle: "primary" | "secondary" | "text";
  className?: string;
  children: string;
  imageSource?: string;
  route?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
}

const Button: FC<ButtonProps> = ({
  id,
  type,
  buttonStyle,
  children,
  className,
  imageSource,
  route,
  disabled = false,
  onClick,
}) => {
  let appearance: string;

  switch (buttonStyle) {
    case "primary":
      appearance = "bg-primary text-neutral-light hover:bg-primary-dark";
      break;
    case "secondary":
      appearance =
        "bg-neutral-grey-1 text-neutral-dark hover:bg-primary hover:text-neutral-light";
      break;
    case "text":
      appearance = "bg-none text-neutral-dark hover:text-primary";
      break;
    default:
      appearance = "bg-primary text-neutral-light hover:bg-primary-dark";
  }

  return (
    <>
      {route && (
        <Link to={route}>
          <button
            id={id}
            type={type}
            disabled={disabled}
            className={`${appearance} text-body  border-none container cursor-pointer transition min-w-full flex flex-row justify-center items-center py-3 px-3 ${className}`}
          >
            {imageSource && (
              <img
                src={imageSource}
                alt="button logo"
                className="w-6 h-6 mr-2"
              />
            )}{" "}
            {children}
          </button>
        </Link>
      )}

      {!route && (
        <button
          id={id}
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${appearance} text-body  border-none container cursor-pointer transition min-w-full flex flex-row justify-center items-center py-3 px-3 ${className}`}
        >
          {imageSource && (
            <img src={imageSource} alt="button logo" className="w-6 h-6 mr-2" />
          )}{" "}
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
