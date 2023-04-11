import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/store";
import { EntryForm, logOutUser } from "features/EntryForm";
import { Button } from "shared/ui";
import { removeTokens } from "shared/lib";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [openState, setOpenState] = useState(isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth === true) {
      setOpenState(false);
    }
  }, [isAuth]);

  return (
    <div className="header">
      <div className="header__title">COOL SITE</div>
      {isAuth ? (
        <Button
          handleClick={() => {
            dispatch(logOutUser());
            removeTokens();
          }}
        >
          LogOut
        </Button>
      ) : (
        <Button
          handleClick={() => {
            setOpenState((state) => !state);
          }}
        >
          LogIn
        </Button>
      )}
      {openState && !isAuth && <EntryForm />}
      <div className="header-links">
        <Link to="/">Home</Link>
        <br />
        <Link to="/hello">Hello</Link>
        <br />
        <Link to="/end">End</Link>
      </div>
    </div>
  );
};
