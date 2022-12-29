import { FC } from "react";

interface DividerProps {
  className?: string;
  children?: string;
}

const Divider: FC<DividerProps> = ({ className = '', children = '' }) => {
  return <>
    {children === '' && (
      <div className={`h-[1px] bg-neutral-grey-2 w-full ${className}`} />
    )}

    {children !== '' && (
      <div className={`flex flex-row items-center justify-center ${className}`}>
        <div className={`h-[1px] bg-neutral-grey-2 w-full`} />
        <span className="text-neutral-grey-4 text-sub1 bg-neutral-light px-2 py-1">{children}</span>
        <div className={`h-[1px] bg-neutral-grey-2 w-full`} />
      </div>
    )}
  </>
};

export default Divider;
