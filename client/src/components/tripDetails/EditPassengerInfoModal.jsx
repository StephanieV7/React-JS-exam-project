import { Button, Form, Alert, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as sharedService from '../../services/passengerInfoService'

const formInitialState = {
  name: '',
  arrivalDate: '',
  arrivalTime: '',
  accomodation: '',
  departureDate: '',
  departureTime: '',
  additionalNotes: '',
};

export default function EditPassengerInfoModal({ showEditPassengerInfo, passengerInfoId, onEditInfoClickClose, onEditInfoClick, onEditInfoClickSubmit}) {
  const [formValues, setFormValues] = useState(formInitialState);
  const [error, setError] = useState('');

  useEffect(() => {

   sharedService.getOnePassengerInfo(passengerInfoId)
      .then(result => {
        setFormValues(result)
      });

  }, []);

  const changeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };


  const validateForm = () => {
    if (!formValues.name) {
      setError('Name is required');
      return false;
    }

    const startDate = new Date(formValues.arrivalDate);
    const endDate = new Date(formValues.departureDate);
    const currentDate = new Date();

    if (startDate > endDate) {
      setError('Departure date cannot be before the arival date');
      return false;
    }

    if (endDate < currentDate) {
      setError('Departure date cannot be in the past');
      return false;
    }

    return true;
  };

  const submitPassengerInfo = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const response = await sharedService.edit(passengerInfoId, formValues);
        onEditInfoClickSubmit(response)
        onEditInfoClickClose();
    } catch (error) {
     
      onEditInfoClickClose(error);
        
    }
    }
    


  };

  return (



    <>

      <Modal show={showEditPassengerInfo} >
        <Modal.Header closeButton onHide={onEditInfoClickClose}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
          <Form>

            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                id="name"
                type="name"
                value={formValues.name}
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Arrival date</Form.Label>
              <Form.Control
                name="arrivalDate"
                id="arrivalDate"
                type="date"
                value={formValues.arrivalDate}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Arrival time</Form.Label>
              <Form.Control
                name="arrivalTime"
                id="arrivalTime"
                type="time"
                value={formValues.arrivalTime}
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Accomodation</Form.Label>
              <Form.Control
                name="accomodation"
                id="accomodation"
                type="text"
                value={formValues.accomodation}
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Departure date</Form.Label>
              <Form.Control
                name="departureDate"
                id="departureDate"
                type="date"
                value={formValues.departureDate}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Departure time</Form.Label>
              <Form.Control
                name="departureTime"
                id="departureTime"
                type="time"
                value={formValues.departureTime}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Additional Notes:</Form.Label>
              <Form.Control
                name="additionalNotes"
                id="additionalNotes"
                type="text"
                value={formValues.additionalNotes}
                onChange={changeHandler}
              />
            </Form.Group>
            <Button variant="secondary" onClick={onEditInfoClickClose}>
              Close
            </Button> {" "}
            <Button type='submit' variant="primary" onClick={submitPassengerInfo}>
              Add your details to the trip
            </Button> {" "}
    
          </Form>
        </Modal.Body>

      </Modal>
    </>

  )
}

