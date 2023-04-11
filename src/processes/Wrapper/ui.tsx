import { Header } from "widgets/Header";
import { useAppSelector } from "shared/store";
import { useValidRefreshToken } from "./hooks";
import { Pages } from "pages";

export const Wrapper = () => {
  const isLoadingSite = useAppSelector((state) => state.user.isLoadingSite);

  useValidRefreshToken();

  return (
    <div className="wrapper">
      {isLoadingSite ? (
        <div className="wrapper__loading">loading</div>
      ) : (
        <>
          <Header />
          <Pages />
        </>
      )}
    </div>
  );
};
