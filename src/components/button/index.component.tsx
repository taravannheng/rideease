import { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  id?: string;
  type: "button" | "submit";
  buttonStyle: "primary" | "secondary" | "text" | "go-back";
  className?: string;
  children: string;
  imageSource?: string;
  iconSource?: IconProp;
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
  iconSource,
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
    case "go-back":
      appearance = "bg-none text-neutral-grey-4 hover:text-primary";
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
            className={`container flex min-w-full cursor-pointer flex-row items-center justify-center gap-x-2 border-none py-3 px-3 text-body transition ${appearance} ${className}`}
          >
            {iconSource && <FontAwesomeIcon icon={iconSource} />}
            {imageSource && (
              <img
                src={imageSource}
                alt="button logo"
                className="mr-2 h-6 w-6"
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
          className={`${appearance} container  flex min-w-full cursor-pointer flex-row items-center justify-center border-none py-3 px-3 text-body transition ${className}`}
        >
          {imageSource && (
            <img src={imageSource} alt="button logo" className="mr-2 h-6 w-6" />
          )}{" "}
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
