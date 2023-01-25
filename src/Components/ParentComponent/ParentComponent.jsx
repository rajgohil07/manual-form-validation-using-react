import { useEffect, useState } from "react";
import { SignInForm } from "../SignInForm/SignInForm";
import { UserDashBoard } from "../UserDashBoard/UserDashBoard";
import {
  destroyData,
  getLocalStorageData,
} from "../../Functions/GetterSetterLocalStorage";

export const ParentComponent = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    getLocalStorageData().isUserLoggedIn || false
  );

  useEffect(() => {
    if (!isUserLoggedIn) {
      destroyData();
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {isUserLoggedIn ? (
        <UserDashBoard setIsUserLoggedIn={setIsUserLoggedIn} />
      ) : (
        <SignInForm setIsUserLoggedIn={setIsUserLoggedIn} />
      )}
    </>
  );
};
