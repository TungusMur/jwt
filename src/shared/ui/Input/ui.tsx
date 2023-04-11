import { memo } from "react";
import { FC } from "react";
import { IINput } from "./models";

export const Input: FC<IINput> = memo(
  ({
    passwordType,
    value,
    name,
    className,
    handleChange = () => {},
    children,
  }) => {
    return (
      <label className="label">
        {children}
        <input
          type={passwordType ? "password" : "text"}
          value={value}
          name={name}
          className={className}
          onChange={handleChange}
        />
      </label>
    );
  }
);
