export type IDefaultState = {
    username: string,
    password: string,
    errorCheck: boolean,
    isLogIn: boolean,
};

export const defaultState: IDefaultState = {
    username: "",
    password: "",
    errorCheck: false,
    isLogIn: true,
};
