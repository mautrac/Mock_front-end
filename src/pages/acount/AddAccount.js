import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

import * as Yup from 'yup';

class AddAccount {

    constructor(this, props) {
        this.super();
        this.props = props;
    }


    render() {
        return (
            <Modal isOpen={isOpenModalCreate}>
                <Formik
                initialValues={
                    {
                    name: ''
                    }
                }
                validationSchema={
                    Yup.object({
                    name: Yup.string()
                        .min(6, 'Must be between 6 and 50 characters')
                        .max(50, 'Must be between 6 and 50 characters')
                        .required('Required')
                        .test('checkUniqueName', 'This name is already registered.', async name => {
                        // call api
                        const isExists = await GroupApi.existsByName(name);
                        return !isExists;
                        }),
                    })
                }

                onSubmit={
                    async values => {
                    try {
                        await GroupApi.create(values.name);
                        // show notification
                        showSuccessNotification(
                        "Create Group",
                        "Create Group Successfully!"
                        );
                        // close modal
                        setOpenModalCreate(false);
                        // Refresh table
                        refreshForm();
                    } catch (error) {
                        console.log(error);
                        setOpenModalCreate(false);
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
                    <ModalHeader>Create Group</ModalHeader>

                    {/* body */}
                    <ModalBody className="m-3">

                        <Row style={{ alignItems: "center" }}>
                        <Col lg="auto">
                            <label>Group Name:</label>
                        </Col>
                        <Col>
                            <FastField
                            type="text"
                            bsSize="lg"
                            name="name"
                            placeholder="Enter group name"
                            component={ReactstrapInput}
                            />
                        </Col>
                        </Row>

                    </ModalBody>

                    {/* footer */}
                    <ModalFooter>
                        <Button type="submit" color="primary" disabled={isSubmitting}>
                        Save
                        </Button>{" "}

                        <Button color="primary" onClick={() => setOpenModalCreate(false)}>
                        Close
                        </Button>
                    </ModalFooter>
                    </Form>
                )}
                </Formik >
            </Modal>
        );
    }
    
}