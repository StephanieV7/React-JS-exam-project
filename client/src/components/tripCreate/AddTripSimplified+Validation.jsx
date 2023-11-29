import { Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import * as tripService from '../../services/tripService';
import { useNavigate } from 'react-router-dom';
import styles from './AddTrip.module.css';

const formInitialState = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
};

export default function AddTrip() {
  const [formValues, setFormValues] = useState(formInitialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const resetFormHandler = () => {
    setFormValues(formInitialState);
    setError('');
  };

  const validateForm = () => {
    if (!formValues.title || !formValues.destination || !formValues.startDate) {
      setError('Title, destination and start date are required');
      return false;
    }

    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);
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

        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            id="title"
            type="text"
            value={formValues.title}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Destination</Form.Label>
          <Form.Control
            name="destination"
            id="destination"
            type="text"
            value={formValues.destination}
            onChange={changeHandler}
            placeholder="Enter your destination" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            name='startDate'
            id='startDate'
            type="date"
            value={formValues.startDate}
            onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            name='endDate'
            id='endDate'
            type="date"
            value={formValues.endDate}
            onChange={changeHandler} />
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

