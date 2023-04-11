export const getToken = (propertyToken: string) =>
  localStorage[propertyToken] &&
  JSON.parse(atob(localStorage[propertyToken].split(".")[1]));

export const checkValidToken = async (
  propertyToken: string,
  func?: () => void
) => {
  const token = getToken(propertyToken);
  if (token && token?.exp > Date.now() / 1000) {
    func && (await func());
    return true;
  }
  return false;
};

export const removeTokens = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};
