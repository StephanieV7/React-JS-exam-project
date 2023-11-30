import { Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import * as tripService from '../../services/tripService';
import { useNavigate } from 'react-router-dom';
import styles from './AddTrip.module.css';

const formInitialState = {
  title: '',
  destinations: [{ destination: "", startDate: "", endDate: '' }],
};

export default function AddTrip() {
  const [formValues, setFormValues] = useState(formInitialState);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const changeHandler = (e, index) => {

    const copyDestinations = [...formValues.destinations];
    //copyDestinations[index][e.target.name] = e.target.value; това модифицира директно масива, затова даваше грешка

    copyDestinations[index] = {
      ...copyDestinations[index],
      [e.target.name]: e.target.value,
    };

    setFormValues((state) => ({ ...state, destinations: copyDestinations }));

  };

  const addDestinationHandler = () => {
    setFormValues((state) => ({
      ...state,
      destinations: [...state.destinations, { destination: '', startDate: '', endDate: '' }],
    }));
  };

  const resetFormHandler = () => {
    setFormValues(formInitialState);

  };

  const validateForm = () => {
    if (!formValues.title || !formValues.destinations[0].destination || !formValues.destinations[0].startDate) {
      setError('Title, destination and start date are required');
      return false;
    }
    
    const startDate = new Date(formValues.destinations[0].startDate);
    const endDate = new Date(formValues.destinations[0].endDate);
    const currentDate = new Date();

    if (startDate > endDate) {
      setError('End date cannot be before the start date');
      return false;
    }

    if (endDate < currentDate) {
      setError('End date cannot be in the past');
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await tripService.create(formValues);
      resetFormHandler();
      navigate('/trips');
    }

  };

  return (
    <div className={styles.mainContainer}>
      <Form onSubmit={submitHandler}>

        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            id="title"
            type="text"
            value={formValues.title}
            onChange={(e) => setFormValues((state) => ({ ...state, title: e.target.value }))}
          />
        </Form.Group>

        {formValues.destinations.map((destination, index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                name="destination"
                id="destination"
                type="text"
                value={destination.destination}
                onChange={(e) => changeHandler(e, index)}
                placeholder="Enter your destination"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                name="startDate"
                id='startDate'
                type="date"
                value={destination.startDate}
                onChange={(e) => changeHandler(e, index)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control
                name="endDate"
                id='endDate'
                type="date"
                value={destination.endDate}
                onChange={(e) => changeHandler(e, index)}
              />
            </Form.Group>

          </div>
        ))}
        
        <Button className={styles.addTripButton} type="submit" variant="primary">
          Add trip
        </Button>
        <Button className={styles.addTripButton} type="button" onClick={resetFormHandler} variant="primary">
          Reset fields
        </Button>
      </Form>


      <Button className={styles.addTripButton} type="button" onClick={addDestinationHandler} variant="primary">
        Add more fields
      </Button>

    </div>
  );
}

