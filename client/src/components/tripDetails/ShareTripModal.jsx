import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';


export const ShareTripModal = ({ show,
    shareHandler,
    onShareClickClose
}) => {

    const [formValues, setFormValues] = useState({ email: '' });

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (shareHandler) {
            shareHandler(formValues)
        }


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
                    </Form.Group>
                    <Button variant="primary" type='submit' style={{ marginLeft: '10px' }}>Add</Button>
                    <Button variant="secondary" onClick={onShareClickClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ShareTripModal