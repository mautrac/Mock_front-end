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
  Input,

} from "reactstrap";
import { FastField, Form, Formik, Field, FormikConsumer } from "formik";

import * as Yup from 'yup';
import userApi from '../../api/UserApi'
import store from "../../redux/store";
import { toastr } from "react-redux-toastr";

import AutoSizeImage from "./AutoResizeImage";
import {TextArea, TextInput} from "../../custom_/Text"
import  '../../css/general.scss';
import UploadImageModal from "./UploadImageModal";



function AddFilmModal(props) {

    const label_width = 3;
    const input_width = 6;

    const [isOpenUploadModal, setOpenUploadModal] = useState(false);

    const film = {
        name: "Miss marvel",
        description: "Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác cùng nhau để cứu vũ trụ.",
        directors: "Nia DaCosta",
        actors: "Brie Larson, Iman Vellani, Teyonah Parris, Zawe Ashton",
        genre: "Hành động, phiêu lưu",
        duration: "104 phút",
        release_date: "10/11/2023",
        poster: 'https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f23%2f400x633%2D133942%2D231023%2D43.png'
    }

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
    <>
        <Formik
            initialValues={
                {
                    name: '',
                    directors: '',
                    actors: '',
                    genre: '',
                    duration: '',
                    description: '',
                    release_date: '',
                    ticket_price: '',
                    poster: film.poster,
                    creator_id: ''
                }
            }
            validationSchema={
                Yup.object({
                    // name: Yup.string()
                    //     .required("Required")
                    //     .max(50, '50 characters max'),
                    // directors: Yup.string()
                    //     .required("Required")
                    //     .max(50, '50 characters max'),
                    // actors: Yup.string()
                    //     .required("Required")
                    //     .max(50, '50 characters max'),
                    // genre: Yup.string()
                    //     .required("Required")
                    //     .max(20, '20 characters max'),
                    // duration: Yup.number()
                    //     .required("Required")
                    //     .integer()
                    //     .positive(),
                    // description: Yup.string()
                    //     .required("Required")
                    //     .max(50, '50 characters max'),
                    // release_date: Yup.date()
                    //     .required("Required")
                    //     .isValid(),
                    // ticket_price: Yup.string()
                    //     .required("Required")
                    //     .max(50, '50 characters max'),
                    
                })
            }

            onSubmit={
              async values => {
                console.log(values);
                // try {
                //   await userApi.createAccountFromAdmin(values);
                //   // show notification
                //   console.log(values);
                //   showSuccessNotification(
                //     "Create Addcount",
                //     "Create Account Successfully!"
                //   );
                //   // close modal
                //   props.setOpenModalCreate(false);
                //   // Refresh table
                //   props.refreshForm();
                // } catch (error) {
                //   console.log(error);
                //   props.setOpenModalCreate(false);
                //   // redirect page error server
                //   props.history.push("/auth/500");
                // }
              }
            }

          validateOnChange={false}
            validateOnBlur={false}
        >
            {({ isSubmitting }) => (
            <Form>
                <Container fluid>
                    <div >
                        <Row>
                            <Col xs={3} >
                                <Row>
                                    <FormikConsumer>
                                        {({values}) => (
                                            <img src={values.poster} 
                                            alt="anh" className="film-infor-img"
                                            />
                                        )}
                                    </FormikConsumer>
                                </Row>
                                <br />
                                <Row className="justify-content-md-center">
                                    <Button color="primary" onClick={() => setOpenUploadModal(true)}>Upload image</Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="name" className="film-infor-label ">Film name</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <FastField
                                        type="text"
                                        
                                        name="name"
                                        placeholder="Enter film name"
                                        component={TextInput}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = '1'>
                                        <label htmlFor="description" className="film-infor-label ">Description</label>
                                    </Col>
                                </Row>
                                <Row lg = '2' form="true">
                                    <Col lg="1" xs = "auto">
                                    <FastField
                                            
                                            name="description"
                                            placeholder="Enter description"
                                            component={TextArea}
                                        
                                    />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="directors" className="film-infor-label ">Directors</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <FastField
                                            type="text"
                                            
                                            name="directors"
                                            placeholder="Enter directors"
                                            component={TextInput}
                                        />
                                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="actors" className="film-infor-label ">Actors</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <FastField
                                            type="text"
                                            
                                            name="actors"
                                            placeholder="Enter actors"
                                            component={TextInput}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="genre" className="film-infor-label ">Genre</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <FastField
                                            type="text"
                                            
                                            name="genre"
                                            placeholder="Enter genre"
                                            component={TextInput}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="duration" className="film-infor-label ">Duration</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <span>
                                            <FastField
                                            type="number"
                                            
                                            name="duration"
                                            placeholder="Enter duration"
                                            component={TextInput}
                                            />
                                        </span> Phút
                                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="ticket_price" className="film-infor-label ">Ticket price</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <span>
                                            <FastField
                                                type="text"
                                                
                                                name="ticket_price"
                                                placeholder="Ex: 100,000"
                                                component={TextInput}
                                            /> VND
                                        </span>
                                        
                                        
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg = {label_width}>
                                        <label htmlFor="ticket_price" className="film-infor-label ">Release date</label>
                                    </Col>
                                    <Col lg = {input_width}>
                                        <FastField
                                            type="date"
                                            
                                            name="release_date"
                                            component={TextInput}
                                        />
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Button type="submit" color="primary">
                                    Save
                            </Button>{" "}

                            <Button color="primary" >
                                Close
                            </Button>
                        </Row>
                    </div>
                    
                    

                </Container>
                <FormikConsumer>
                    {(formik) => (
                        <UploadImageModal isOpenUploadModal={isOpenUploadModal} setOpenUploadModal={setOpenUploadModal} formik={formik}/>
                    )}
                </FormikConsumer>     
            </Form>
            )}

            
        </Formik >
                               
        
    </>
  )

}



export default AddFilmModal;