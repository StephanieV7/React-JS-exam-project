import { Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import * as sharedService from '../../services/sharedService'
import { useNavigate } from 'react-router-dom';

const formInitialState = {
  name: '',
  arrivalDate: '',
  arrivalTime: '',
  accomodation: '',
  departureDate: '',
  departureTime: '',
};

export default function AddTrip() {
  const [formValues, setFormValues] = useState(formInitialState);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const resetFormHandler = () => {
    setFormValues(formInitialState);
  };



  const submitHandler = async (e) => {
    e.preventDefault();
      
      await sharedService.create(formValues);
      resetFormHandler();
      navigate('/sharedTrips');
    
  };

  return (
    <div className={styles.mainContainer}>
      <Form onSubmit={submitHandler}>
        {error && <Alert variant="danger">{error}</Alert>}

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
          <Form.Label>arrivalDate</Form.Label>
          <Form.Control
            name="arrivalDate"
            id="arrivalDate"
            type="date"
            value={formValues.arrivalDate}
            onChange={changeHandler}
             />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>arrivalDate</Form.Label>
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
          <Form.Label>Departure Date</Form.Label>
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

        <Button className={styles.addTripButton} type="submit" variant="primary">
          Add trip
        </Button>

        <Button className={styles.addTripButton} type="button" onClick={resetFormHandler} variant="primary">
          Reset fields
        </Button>
      </Form>
    </div>
  );
}

