import { FC } from "react";

interface DividerProps {
  className?: string;
  children?: string;
}

const Divider: FC<DividerProps> = ({ className = "", children = "" }) => {
  return (
    <>
      {children === "" && (
        <div className={`h-[1px] w-full bg-neutral-grey-2 ${className}`} />
      )}

      {children !== "" && (
        <div
          className={`flex flex-row items-center justify-center ${className}`}
        >
          <div className={`h-[1px] w-full bg-neutral-grey-2`} />
          <span className="bg-neutral-light px-2 py-1 text-sub1 text-neutral-grey-4">
            {children}
          </span>
          <div className={`h-[1px] w-full bg-neutral-grey-2`} />
        </div>
      )}
    </>
  );
};

export default Divider;
