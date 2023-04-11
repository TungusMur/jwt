import { ReactElement } from "react";

export type IButton = {
    handleClick?: () => void,
    children: ReactElement | string,
};