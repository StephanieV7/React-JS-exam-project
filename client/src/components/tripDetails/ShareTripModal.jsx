import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import * as tripService from '../../services/tripService'
import * as registeredUsersService from '../../services/registeredUsersService'
import { login } from '../../services/authService';


export const ShareTripModal = ({ show, tripId,
    onShareClickClose, onShareClick
}) => {

    const [formValues, setFormValues] = useState({ email: '' });
    const [error, setError] = useState(false);

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userList = await registeredUsersService.getRegisteredUsers(formValues.email);

        const checkUser = () => {
           
            for (const user of userList) {
                if (user.email === formValues.email) {
                    return true
                }

            }
            setError('The person with this email address is not registered.')
            return false
        }

        if (checkUser()) {
            const data = { shared: formValues.email };

            const result = await tripService.edit(tripId, data);
            onShareClick();
            onShareClickClose();
        }
    }
    return (
        <Modal show={show} onEscapeKeyDown={onShareClickClose}>
            <Modal.Header closeButton onHide={onShareClickClose}>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Add email here" value={formValues.name} onChange={onChangeHandler} />
                        <p>Note: you can share your trips only to other registered users</p>
                    </Form.Group>
                    <Button variant="primary" type='submit' style={{ marginLeft: '10px' }}>Share</Button>
                    <Button variant="secondary" onClick={onShareClickClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ShareTripModal