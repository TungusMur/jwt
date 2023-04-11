import { useState, useEffect, useCallback, FormEvent } from "react";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/ui";
import { useAppDispatch, useAppSelector } from "shared/store";
import { defaultState } from "./config";
import { handleSubmit, handleChange } from "./lib";
import "./styles.scss";

export const EntryForm = () => {
  const [formState, setFormState] = useState(defaultState); //
  const messageError = useAppSelector((state) => state.user.messageError);
  const dispatch = useAppDispatch();

  const handleSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) =>
      handleSubmit(e, setFormState, formState, dispatch),
    [setFormState, formState, dispatch]
  );

  const handleChangeForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => handleChange(e, setFormState),
    [setFormState]
  );

  useEffect(() => {
    if (formState.errorCheck !== !!messageError) {
      setFormState((state) => ({ ...state, errorCheck: !!messageError }));
    }
  }, [messageError]);

  return (
    <div className="entryForm">
      <div className="entryForm-wrapper__title">
        {formState.isLogIn ? "Authorization" : "Registration"}
      </div>
      <form
        className="entryForm-form"
        onSubmit={handleSubmitForm}
        onChange={handleChangeForm}
      >
        <Input value={formState.username} name="username">
          Логин
        </Input>
        <Input value={formState.password} name="password" passwordType>
          Пароль
        </Input>
        <Button>Click</Button>
      </form>
      {formState.errorCheck && (
        <div className="entryForm__error">{messageError}</div>
      )}
      <Button
        handleClick={() =>
          setFormState(({ isLogIn, errorCheck, ...state }) => ({
            ...state,
            errorCheck: false,
            isLogIn: !isLogIn,
          }))
        }
      >
        {formState.isLogIn ? "Registration" : "Authorization"}
      </Button>
    </div>
  );
};
