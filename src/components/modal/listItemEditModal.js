import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { Input } from "reactstrap";

const Listitemeditmodal = (props) => {

    const { modalOpen, handleClose } = props;

    return (
        <Modal show={modalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit List Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input type="text" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default Listitemeditmodal