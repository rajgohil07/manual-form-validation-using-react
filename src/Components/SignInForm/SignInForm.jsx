import "./SignInForm.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useEffect, useRef, useState } from "react";
import { setData } from "../../Functions/GetterSetterLocalStorage";

export const SignInForm = ({ setIsUserLoggedIn }) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const initialState = {
    userName: "",
    email: "",
    password: "",
    termsChecked: false,
  };

  const initialErrorState = {
    userName: "",
    email: "",
    password: "",
    termsChecked: "",
  };

  const [inputValue, setInputValue] = useState(initialState);
  const [errorObj, updateErrorObject] = useState(initialErrorState);
  const [isValidated, changeIsValidation] = useState(false);
  const loadingFirstTime = useRef(
    process.env.NODE_ENV === "development" ? 4 : 2
  );

  const handleOnChange = (e) => {
    const { value, name, checked } = e.target;
    setInputValue({
      ...inputValue,
      [name]: name !== "termsChecked" ? value : checked,
    });
  };

  useEffect(() => {
    if (loadingFirstTime.current !== 0) {
      loadingFirstTime.current = loadingFirstTime.current - 1;
    } else {
      // Validation for the userName field
      if (!inputValue.userName) {
        updateErrorObject((state) => ({
          ...state,
          userName: "Username is required",
        }));
      } else if (inputValue.userName.length <= 2) {
        updateErrorObject((state) => ({
          ...state,
          userName: "Username should be more then 3 character",
        }));
      } else if (inputValue.userName.length > 100) {
        updateErrorObject((state) => ({
          ...state,
          userName: "Username should be exceeded more then 100 character",
        }));
      } else {
        updateErrorObject((state) => ({
          ...state,
          userName: "",
        }));
      }
      // Validation for the email field
      if (!inputValue.email) {
        updateErrorObject((state) => ({
          ...state,
          email: "Email is required",
        }));
      } else if (!inputValue.email.match(emailRegex)) {
        updateErrorObject((state) => ({
          ...state,
          email: "Email should be valid",
        }));
      } else {
        updateErrorObject((state) => ({
          ...state,
          email: "",
        }));
      }
      // Validation for the password field
      if (!inputValue.password) {
        updateErrorObject((state) => ({
          ...state,
          password: "Password is required",
        }));
      } else if (inputValue.password.length < 6) {
        updateErrorObject((state) => ({
          ...state,
          password: "Password should be more then 5 character",
        }));
      } else if (inputValue.password.length > 11) {
        updateErrorObject((state) => ({
          ...state,
          password: "Password should be exceeded more then 11 character",
        }));
      } else {
        updateErrorObject((state) => ({
          ...state,
          password: "",
        }));
      }
      // Validation for the terms and condition checkbox
      if (!inputValue.termsChecked) {
        updateErrorObject((state) => ({
          ...state,
          termsChecked:
            "Please accept our terms and conditions before continue",
        }));
      } else {
        updateErrorObject((state) => ({
          ...state,
          termsChecked: "",
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (loadingFirstTime.current !== 0) {
      loadingFirstTime.current = loadingFirstTime.current - 1;
    } else {
      const errorLength = Object.keys(errorObj).filter((key) => errorObj[key]);
      if (errorLength.length === 0) {
        changeIsValidation(true);
      } else {
        changeIsValidation(false);
      }
    }
  }, [errorObj]);

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <div className="d-flex flex-row align-items-baseline mb-0 maxFixedWidth justify-content-center">
                <MDBIcon fas icon="user me-3" size="lg" />
                <div className="d-flex flex-column mb-4 maxFixedWidth">
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    name="userName"
                    value={inputValue.userName}
                    onChange={handleOnChange}
                  />
                  {
                    <p className="redErrorP text-left maxFixedWidth">
                      {errorObj.userName}
                    </p>
                  }
                </div>
              </div>

              <div className="d-flex flex-row align-items-baseline mb-0 maxFixedWidth justify-content-center">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <div className="d-flex flex-column mb-4 maxFixedWidth">
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    name="email"
                    value={inputValue.email}
                    onChange={handleOnChange}
                  />
                  {
                    <p className="redErrorP text-left maxFixedWidth">
                      {errorObj.email}
                    </p>
                  }
                </div>
              </div>

              <div className="d-flex flex-row align-items-baseline mb-0 maxFixedWidth justify-content-center">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <div className="d-flex flex-column mb-4 maxFixedWidth">
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    name="password"
                    value={inputValue.password}
                    onChange={handleOnChange}
                  />
                  {
                    <p className="redErrorP maxFixedWidth text-left">
                      {errorObj.password}
                    </p>
                  }
                </div>
              </div>

              <div className="mb-2 maxFixedForCheckBox">
                <div>
                  <MDBCheckbox
                    name="termsChecked"
                    checked={inputValue.termsChecked}
                    id="flexCheckDefault"
                    label="Please agree to our terms and conditions"
                    onChange={handleOnChange}
                  />
                </div>
                {
                  <p className="redErrorP maxFixedWidth mb-4 text-left">
                    {errorObj.termsChecked}
                  </p>
                }
              </div>

              <MDBBtn
                className="mb-4"
                disabled={!isValidated}
                size="lg"
                onClick={() => {
                  if (isValidated) {
                    setData(true, inputValue.userName);
                    setIsUserLoggedIn(true);
                  }
                }}
              >
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
