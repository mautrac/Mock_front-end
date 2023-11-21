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
  ListGroup,
  ListGroupItem,

} from "reactstrap";
import { FastField, Form, Formik, Field, FormikConsumer, ErrorMessage } from "formik";

import * as Yup from 'yup';
import userApi from '../../api/UserApi'
import store from "../../redux/store";
import { toastr } from "react-redux-toastr";

import AutoSizeImage from "./AutoResizeImage";
import {TextArea, TextInput} from "../../custom_/Text"
import  '../../css/general.scss';
import UploadImageModal from "./UploadImageModal";

import daysOfWeek from "../../utils/DaysOfWeek";
import { FilmScheduleList } from "./FilmScheduleList";

import api from "../../api/FilmApi";


function AddFilmModal(props) {

    const label_width = 3;
    const input_width = {
        name: 9,
        description: 12,
        directors: 9,
        actors: 9,
        genre: 9,
        duration: 5,
        ticket_price: 5,
        release_date: 5
    }

    const [isOpenUploadModal, setOpenUploadModal] = useState(false);

    const film = {
        name: "Miss marvel",
        description: "Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác cùng nhau để cứu vũ trụ.",
        directors: "Nia DaCosta",
        actors: "Brie Larson, Iman Vellani, Teyonah Parris, Zawe Ashton",
        genre: "Hành động, phiêu lưu",
        duration: "104 phút",
        release_date: "10/11/2023",
        poster: 'https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f23%2f400x633%2D133942%2D231023%2D43.png',
        schedule: [
            {
                timeSlot: "2023-11-20T20:30",
                seatNumber: 120
            },
            {
                timeSlot: "2023-11-21T20:00",
                seatNumber: 96
            }
        ]
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

    let validatationObject = Yup.object().shape({
        name: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        directors: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        actors: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        genre: Yup.string()
            .required("Required")
            .max(100, '100 characters max'),
        duration: Yup.number()
            .required("Required")
            .integer()
            .positive(),
        description: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        release_date: Yup.date()
            .required("Required"),
            
        ticket_price: Yup.number()
            .required("Required")
            .integer()
            .positive()

    });

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
                validatationObject
            }

            onSubmit={
              async values => {

                try {
                    await api.createFilm(values);
                    // show notification
                    console.log(values);
                    showSuccessNotification(
                        "Create film",
                        "Create film Successfully!"
                    );

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
                <Container fluid>
                    <div >
                        <Row >
                            <Col lg={3} >
                                
                                    <Row>
                                        <FormikConsumer>
                                            {({values}) => (
                                                <div className="film-infor-frame">
                                                    <img src={values.poster} 
                                                    alt="anh" className="film-infor-img"
                                                    />

                                                </div>
                                            )}
                                        </FormikConsumer>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Button color="primary" onClick={() => setOpenUploadModal(true)}>Upload image</Button>
                                    </Row>

                            </Col>
                            <Col lg = {6} >
                                <div className="film-infor-edit-frame">
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.name}
                                            type="text"
                                            label="Film name"
                                            name="name"
                                            placeholder="Enter film name"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="name" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <label htmlFor="description" className="film-infor-label" >Description</label>
                                            </Col>
                                        </Row>
                                        <Row >
                                            
                                            <FastField
                                                input_width={input_width.description}
                                                name="description"
                                                placeholder="Enter description"
                                                component={TextArea}
                                                
                                            />
                                            
                                        </Row>
                                        <ErrorMessage name="description" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.directors}
                                            type="text"
                                            label="Directors"
                                            name="directors"
                                            placeholder="Enter directors"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="directors" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.actors}
                                            type="text"
                                            label="Actors"
                                            name="actors"
                                            placeholder="Enter actors"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="actors" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.genre}
                                            type="text"
                                            label="Genre"
                                            name="genre"
                                            placeholder="Enter genre"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="genre" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.duration}
                                            type="number"
                                            label="Duration"
                                            name="duration"
                                            placeholder="Enter duration"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="duration" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.ticket_price}
                                            type="text"
                                            label="Ticket price"
                                            name="ticket_price"
                                            placeholder="Ex: 100,000"
                                            component={TextInput}
                                        /> 
                                        <ErrorMessage name="ticket_price" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.release_date}
                                            type="date"
                                            label="Release date"
                                            name="release_date"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="release_date" />
                                    </FormGroup>

                                </div>


                            </Col>
                        </Row>
                        
                        <div className="film-infor-save-row">
                            <p>
                                <Button type="submit" color="primary" style={{marginRight: "50px"}}>
                                        Save
                                </Button>
                                
                                <Button color="primary" >
                                    Close
                                </Button>

                            </p>
                        </div>
                            
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
        <h3>Film schedule</h3>
        <FilmScheduleList film={film} />   
        
    </>
  )

}



export default AddFilmModal;