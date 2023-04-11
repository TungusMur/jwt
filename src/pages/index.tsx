import { Routes, Route } from "react-router";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "shared/store";

const Layout = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

const HelloComp = () => {
  return <div>Hello</div>;
};

const EndComp = () => {
  return <div>End</div>;
};

const HomePage = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <div>
      <div>MVA production</div>
      {!isAuth && <div>Please, logIn</div>}
    </div>
  );
};

export const Pages = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<Layout />}>
        <Route path="/hello" element={<HelloComp />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/end" element={<EndComp />} />
      </Route>
    </Routes>
  );
};
