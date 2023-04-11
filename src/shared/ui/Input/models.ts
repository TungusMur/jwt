import { ChangeEvent, ReactElement } from "react";

export type IINput = {
    name: string,
    value: string,
    handleChange?: (e: ChangeEvent) => void,
    children?: ReactElement | string,
    className?: string,
    passwordType?: boolean,
};