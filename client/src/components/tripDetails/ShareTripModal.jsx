import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import * as tripService from '../../services/tripService'


export const ShareTripModal = ({ show, tripId,
    onShareClickClose, onShareClick
}) => {

    const [formValues, setFormValues] = useState({ email: '' });

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = { shared: formValues.email };

        const result = await tripService.edit(tripId, data);
        console.log(result);
        onShareClick();
        onShareClickClose();

        //to-do: add error handling?
        //to-do: add form validation
    }
    return (
        <Modal show={show} onEscapeKeyDown={onShareClickClose}>
            <Modal.Header closeButton onHide={onShareClickClose}>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Add email here" value={formValues.name} onChange={onChangeHandler} />
                        <p>Note: you can share your trips only to other registered users</p>
                    </Form.Group>
                    <Button variant="primary" type='submit' style={{ marginLeft: '10px' }}>Add</Button>
                    <Button variant="secondary" onClick={onShareClickClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ShareTripModal