import React, { useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";

function TextArea(props) {


    return (
        <textarea className="film-infor-textarea" placeholder="Enter description"
            {...props.field} {...props.form}
        />
    )
}

function TextInput(props) {

    var check = typeof(props.label) === "undefined";
    var Lab;

    if (!check)
        Lab = (<label htmlFor={props.field.name}>{props.label}</label>);

    let Inp = <Input className="film-infor-input" placeholder={props.placeholder}
            {...props.field} {...props}
        />;

    console.log(props);

    return (
        <>

            {check &&
                <>
                    {Inp}
                </>
            }
            {!check &&
                <>
                    <Row >
                        <Col lg={3}>
                            {Lab}
                        </Col>
                        <Col>
                            {Inp}
                        </Col>
                    </Row>
                </>
            }

        </>
    )
}

export {TextArea, TextInput};