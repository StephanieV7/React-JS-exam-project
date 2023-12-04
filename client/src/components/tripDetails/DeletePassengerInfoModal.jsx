import { Button, Modal } from 'react-bootstrap';
import * as tripService from '../../services/tripService'
import { useNavigate } from 'react-router-dom';
import * as sharedService from '../../services/sharedService';

export const DeletePassengerInfoModal = ({ showDeletePassengerInfo, passengerInfoId,
    onDeleteInfoClickClose, onDeleteInfoClick, onDeleteSubmit
}) => {
    
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await sharedService.removePassengerInfo(passengerInfoId);
            onDeleteSubmit();
            onDeleteInfoClick();
            onDeleteInfoClickClose();
            navigate('/sharedTrips');
        } catch (error) {
            
            onDeleteSubmit(error.message);
            onDeleteInfoClick();
            onDeleteInfoClickClose();
            navigate('/sharedTrips');
            
        }

    }
    return (
        <Modal show={showDeletePassengerInfo} onEscapeKeyDown={onDeleteInfoClickClose}>
            <Modal.Header closeButton onHide={onDeleteInfoClickClose}>
                <Modal.Title>WARNING: YOU'RE ABOUT TO DELETE YOUR INFORMATION FROM THE TRIP</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                ARE YOU SURE YOU WANT TO PROCEED? THIS CANNOT BE UNDONE
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDeleteInfoClickClose}>CLOSE</Button>
                <Button variant="primary" onClick={onSubmit}>DELETE YOUR INFO</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default DeletePassengerInfoModal;