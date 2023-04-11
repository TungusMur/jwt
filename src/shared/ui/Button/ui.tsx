import { FC, memo } from "react";
import { IButton } from "./models";

export const Button: FC<IButton> = memo(({ handleClick, children }) => {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
});
