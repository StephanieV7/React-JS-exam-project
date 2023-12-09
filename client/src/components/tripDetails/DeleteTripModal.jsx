import { Button, Modal } from 'react-bootstrap';
import * as tripService from '../../services/tripService'
import { useNavigate } from 'react-router-dom';

export const DeleteTripModal = ({ showDeleteTrip, tripId,
    onDeleteClickClose, onDeleteClick
}) => {

const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault();

        await tripService.remove(tripId);

        onDeleteClick();
        onDeleteClickClose();
        navigate('/trips')

    }
    return (
        <Modal show={showDeleteTrip} onEscapeKeyDown={onDeleteClickClose}>
            <Modal.Header closeButton onHide={onDeleteClickClose}>
                <Modal.Title>WARNING: YOU'RE ABOUT TO DELETE YOUR TRIP</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                ARE YOU SURE YOU WANT TO DELETE THIS TRIP? THIS CANNOT BE UNDONE
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDeleteClickClose}>CLOSE</Button>
                <Button variant="primary" onClick={onSubmit}>DELETE TRIP</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default DeleteTripModal