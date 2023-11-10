import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import { FastField, Form, Formik, Field } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import userApi from '../../api/UserApi'
import store from "../../redux/store";
import { toastr } from "react-redux-toastr";

function AddAccountAdmin(props) {

  //const [isOpenModalCreate, setOpenModalCreate] = useState(true);
  
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 3000,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.success(title, message, options);
  }

  return (
    <Modal isOpen={props.isOpenModalCreate}>
        <Formik
            initialValues={
                {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    role: 'admin'
                }
            }
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                        .required("Required")
                        .max(50, '50 characters max'),
                    lastName: Yup.string()
                        .required("Required")
                        .max(50, '50 characters max'),
                    username: Yup.string()
                        .min(6, 'Must be between 6 and 50 characters')
                        .max(50, 'Must be between 6 and 50 characters')
                        .required('Required')
                        .test('checkUniqueUserName', 'This user name is already registered.', async username => {
                        // call api
                        const isExists =await userApi.existsByUsername(username);
          
                          return !isExists;
                        }),
                    password: Yup.string()
                        .min(6, 'Must be between 6 and 50 characters')
                        .max(50, 'Must be between 6 and 50 characters')
                        .required('Required'),
                    confirmPassword: Yup.string()
                        .required('Required')
                        .when("password", {
                            is: value => (value && value.length > 0 ? true : false),
                            then: Yup.string().oneOf(
                            [Yup.ref("password")],
                            "Confirm Password do not match"
                            )
                        }),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required')
                        .test('checkExistsEmail', 'This email is already registered.', async email => {
                            // call api
                            const isExists = await userApi.existsByEmail(email);
          
                            return !isExists;
                        }),
                    role: Yup.string()
                        .required("Please  select role!")
                        .matches("manager|admin|user")
                    
                })
            }

            onSubmit={
              async values => {

                try {
                  await userApi.createAccountFromAdmin(values);
                  // show notification
                  console.log(values);
                  showSuccessNotification(
                    "Create Addcount",
                    "Create Account Successfully!"
                  );
                  // close modal
                  props.setOpenModalCreate(false);
                  // Refresh table
                  props.refreshForm();
                } catch (error) {
                  console.log(error);
                  props.setOpenModalCreate(false);
                  // redirect page error server
                  props.history.push("/auth/500");
                }
              }
            }

          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* header */}
              <ModalHeader>Create Account</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">
              <FormGroup>
                    <FastField
                      label="First Name"
                      type="text"
                      bsSize="lg"
                      name="firstName"
                      placeholder="Enter first name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Last Name"
                      type="text"
                      bsSize="lg"
                      name="lastName"
                      placeholder="Enter last name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Username"
                      type="text"
                      bsSize="lg"
                      name="username"
                      placeholder="Enter username"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Email"
                      type="email"
                      bsSize="lg"
                      name="email"
                      placeholder="Enter email"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Confirm Password"
                      type="password"
                      bsSize="lg"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label label-for="role" >Select role: </Label>
                    <Field as="select" name="role" placeholder="Select role">
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="user">User</option>
                    </Field>
                  </FormGroup>

                  
              </ModalBody>

              {/* footer */}
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting} >
                  Save
                </Button>{" "}

                <Button color="primary" onClick={() => props.setOpenModalCreate(false)}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik >
      </Modal>
  )

}



export default AddAccountAdmin;