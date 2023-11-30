import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login"


// import { withRouter } from "../../compatible/withRouter";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";

import { FastField, Form, Formik } from "formik";
import { TextInput } from "../../custom_/Text";
import * as Yup from "yup";
import LoginApi from "../../api/LoginApi";
import "./Login.scss";

import avatar from "../../assets/img/avatars/avatar.jpg";
import storage from "../../Storage/Storage";
import { toastr } from "react-redux-toastr";
import UserApi from "../../api/UserApi";

import {
  setUserLoginInfo,
  setTokenInfo,
} from "../../redux/actions/UserLoginInfoActions";
import { connect } from "react-redux";

const showErrorNotification = (title, message) => {
  const options = {
    timeOut: 3000,
    showCloseButton: false,
    progressBar: false,
    position: "top-right",
  };

  // show notification
  toastr.error(title, message, options);
};

const SignIn = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const [isDisableResendButton, setDisableResendButton] = useState(false);

  const resendEmailToActiveAccount = async () => {
    setDisableResendButton(true);
    await UserApi.resendEmailToActiveAccount(email);
    setDisableResendButton(false);
  };
  const responseFacebook = (response) => {
    // Xử lý thông tin đăng nhập qua Facebook ở đây
    console.log(response);
  };

  const responseGoogle = (response) => {
    // Xử lý thông tin đăng nhập qua Gmail ở đây
    console.log(response);
  };

  // rememberMe
  const [checkedRememberMe, setCheckedRememberMe] = React.useState(
    storage.isRememberMe()
  );

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h2>Welcome to Team 1 Cinema Booking</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Required"),

          password: Yup.string()
            .min(6, "Must be between 6 and 50 characters")
            .max(50, "Must be between 6 and 50 characters")
            .required("Required"),
        })}
        onSubmit={
          async (values) => {
            try {
              // call api
              const result = await LoginApi.login(
                values.username,
                values.password
              );

              //check user active
              if (result.token === null || result.token === undefined) {
                setEmail(result.email);
                setOpenModal(true);

              } else {
                // set remember me
                storage.setRememberMe(checkedRememberMe);
                console.log(result);
                // save token & UserInfo to storage
                storage.setToken(result.token);
                storage.setUserInfo(
                  result
                  );

                // save token & UserInfo to redux
                props.setTokenInfo(result.token);
                props.setUserLoginInfo(
                  result.user_id,
                  result.userName,
                  result.email,
                  result.firstName,
                  result.lastName,
                  result.role,
                  result.status)

                // redirect to home page
              }
              props.history.push("/films");

            } catch (error) {
              console.log(error);
              if (error.status === 401) {
                // show error notification
                showErrorNotification("Login Fail!", "Wrong Username or Password!")
              } else {
                // redirect page error server
                props.history.push("/auth/500");
              }
            }
          }
        }
        // validateOnChange={false}
        // validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <div className="text-center">
                  <img
                    src={avatar}
                    alt="Chris Wood"
                    className="img-fluid rounded-circle"
                    width="132"
                    height="132"
                  />
                </div>
                 {/* Nút Sign Up */}
                                 <div className="text-center mt-3">
                  <Link to="/auth/sign-up" className="signup-link">
                    <span className="signup-text">Not registered? Sign up</span>
                  </Link>
                </div>
                <Form>
                  <FormGroup>
                    <FastField
                      label="Username"
                      type="text"
                      bsSize="lg"
                      name="username"
                      placeholder="Enter your username"
                      component={TextInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter password"
                      component={TextInput}
                    />
                    <small>
                      <Link className="forgotpw-text" to="/auth/reset-password">Forgot password?</Link>
                    </small>
                  </FormGroup>                                  
   {/* Remember me */}
   <div className="mb-3">
                    <Input
                      type="checkbox"
                      id="rememberMe"
                      label="Remember me next time"
                      defaultChecked={checkedRememberMe}
                      onChange={() => setCheckedRememberMe(!checkedRememberMe)}
                    />
                    <label htmlFor="rememberMe" className="remember-me-label">
                      Remember me next time
                    </label>
                  </div>

          {/* Nút đăng nhập qua Facebook */}
          <div className="text-center mt-3">
                    <FacebookLogin
                      appId="YOUR_FACEBOOK_APP_ID"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          className="facebook-login-button"
                        >
                          Đăng nhập qua Facebook
                        </button>
                      )}
                    />
                  </div>

                  {/* Nút đăng nhập qua Gmail */}
                  <div className="text-center mt-3">
                    <GoogleLogin
                      clientId="YOUR_GOOGLE_CLIENT_ID"
                      buttonText="Đăng nhập qua Gmail"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          className="google-login-button"
                        >
                          Đăng nhập qua Gmail
                        </button>
                      )}
                    />
                  </div>

                  {/* Nút Sign In */}
                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="signin-button"
                    >
                      Sign in
                    </Button>
                  </div>

                 
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader>You need to active your account</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">Your account is not active.</p>
          <p className="mb-0">
            Please check your email (<b>{email}</b>) to active account.
          </p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button
            color="primary"
            onClick={resendEmailToActiveAccount}
            disabled={isDisableResendButton}
          >
            Resend
          </Button>{" "}
          <Button color="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(
  connect(null, { setUserLoginInfo, setTokenInfo })(SignIn)
);
