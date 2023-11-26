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
  Form,

} from "reactstrap";
import { TextInput } from "../../custom_/Text";
import { FastField, Formik, useField, useFormik } from "formik";



export default function UploadImageModal(props) {

    const [link, setLink] = useState('');

    useEffect(() => {
        setLink(props.formik.values.poster);
    })
    var handleChange = (e) => {
        console.log(e);
        setLink(e.target.value);
    }

    var handleSubmit = () => {
        console.log(link);
        console.log(props);
        props.formik.setValues((old) => {
            return {
                ...old,
                poster: link
            }
        })
        props.setOpenUploadModal(false);
    }

    console.log(props);

    return (
        <Modal isOpen={props.isOpenUploadModal}>
            
            <ModalHeader>
                Upload image
            </ModalHeader>
        
            <ModalBody>
                <Row className="justify-content-md-center">
                    <div style={{width:'50%'}}>
                        <TextInput placeholder="Enter image link" onChange={handleChange} size={3}/>    
                        <div>Preview</div>
                    </div>
                    
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <div style={{maxWidth: '200px', minWidth: '200px'}}>
                        <img src={link} style={{maxWidth: '200px'}} />
                    </div> 

                </Row>
                
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" onClick={handleSubmit}>Save</Button>
                {"  "}
                <Button color="primary" onClick={() => props.setOpenUploadModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}