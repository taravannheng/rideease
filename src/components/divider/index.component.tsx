import { FC } from "react";

import { checkEmpty } from "../../utils/validators/validator";

interface DividerProps {
  className?: string;
  children?: string;
}

const Divider: FC<DividerProps> = ({ className = '', children = '' }) => {
  return <>
    {!checkEmpty(children) && (
      <div className={`h-[1px] bg-neutral-grey-2 w-full ${className}`} />
    )}

    {checkEmpty(children) && (
      <div className={`flex flex-row items-center justify-center ${className}`}>
        <div className={`h-[1px] bg-neutral-grey-2 w-full`} />
        <span className="text-neutral-grey-4 text-body bg-neutral-light px-2 py-1">{children}</span>
        <div className={`h-[1px] bg-neutral-grey-2 w-full`} />
      </div>
    )}
  </>
};

export default Divider;
