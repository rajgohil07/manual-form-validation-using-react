import {
  MDBNavbar,
  MDBBtn,
  MDBContainer,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { getLocalStorageData } from "../../Functions/GetterSetterLocalStorage";

export const UserDashBoard = ({ setIsUserLoggedIn }) => {
  const { userName } = getLocalStorageData();

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer
        tag="form"
        fluid
        className="justify-content-space-between d-flex"
      >
        <MDBNavbarBrand href="#">Welcome back, {userName}!</MDBNavbarBrand>
        <MDBBtn
          color="success"
          className="me-2"
          type="button"
          onClick={() => {
            setIsUserLoggedIn(false);
          }}
        >
          Logout
        </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
};
