import { FormEvent, Dispatch, SetStateAction } from "react";
import { AppDispatch } from "shared/store";
import { defaultState, IDefaultState } from "./config";
import { authorizationUser, registrationUser } from "./model";

export const handleSubmit = (
  e: FormEvent<HTMLFormElement>,
  setState: Dispatch<SetStateAction<IDefaultState>>,
  state: IDefaultState,
  dispatch: AppDispatch
) => {
  e.preventDefault();
  const formSending = {
    username: state.username,
    password: state.password,
  };
  setState(({ isLogIn }) => ({ ...defaultState, isLogIn }));
  dispatch(
    state.isLogIn
      ? authorizationUser(formSending)
      : registrationUser(formSending)
  );
};

export const handleChange = (
  e: FormEvent<HTMLFormElement>,
  setState: Dispatch<SetStateAction<IDefaultState>>
) => {
  setState((state) => ({
    ...state,
    errorCheck: false,
    [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
  }));
};
