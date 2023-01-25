export const setData = (isLoginUserStatus, userName = "") => {
  localStorage.setItem("isUserLoggedIn", isLoginUserStatus);
  if (userName) {
    localStorage.setItem("userName", userName);
  }
};

export const getLocalStorageData = () => {
  return {
    userName: localStorage.getItem("userName"),
    isUserLoggedIn: JSON.parse(localStorage.getItem("isUserLoggedIn")),
  };
};

export const destroyData = () => {
  // localStorage.removeItem("userName");
  // localStorage.removeItem("isUserLoggedIn");
  localStorage.clear();
};
