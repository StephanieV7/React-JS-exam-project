import { Button, Form, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as tripService from '../../services/tripService';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TripUpdate.module.css';
import { validateForm } from '../../utils/validateForm';

export default function UpdateTrip() {
  const [formValues, setFormValues] = useState({
    title: '',
    destinations: [{ destination: "", startDate: "", arrivalTime: "", endDate: '', departureTime: '', accomodation: '', currency: '', additionalNotes: '' }],
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { _id } = useParams();

  useEffect(() => {

    tripService.getOne(_id)
      .then(result => {
        setFormValues(result)
      });

  }, [_id]);

  const changeHandler = (e, index) => {

    const copyDestinations = [...formValues.destinations];
    copyDestinations[index][e.target.name] = e.target.value;

    setFormValues((state) => ({ ...state, destinations: copyDestinations }));

  };

  const addDestinationHandler = () => {
    setFormValues((state) => ({
      ...state,
      destinations: [...state.destinations, { destination: '', startDate: "", arrivalTime: "", endDate: '', departureTime: '', accomodation: '', currency: '', additionalNotes: '' }],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = validateForm(formValues);

    if (!result) {
      await tripService.edit(_id, formValues);
      navigate(`/trips/${_id}`);
    } else {
      setError(result)
    }


  };


  return (
    <div className={styles.tripUpdate}>
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

            <Form.Group className="mb-3" >
              <Form.Label>Arrival time</Form.Label>
              <Form.Control
                name="arrivalTime"
                id="arrivalTime"
                type="time"
                value={destination.arrivalTime}
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

            <Form.Group className="mb-3" >
              <Form.Label>Departure time</Form.Label>
              <Form.Control
                name="departureTime"
                id="departureTime"
                type="time"
                value={destination.departureTime}
                onChange={(e) => changeHandler(e, index)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Accomodation</Form.Label>
              <Form.Control
                name="accomodation"
                id="accomodation"
                type="text"
                value={destination.accomodation}
                onChange={(e) => changeHandler(e, index)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select name="currency"
                id='currency'
                type="text"
                value={destination.currency}
                onChange={(e) => changeHandler(e, index)}>
                <option>United States Dollar (USD)</option>
                <option>Euro (EUR)</option>
                <option>Japanese Yen (JPY)</option>
                <option>British Pound Sterling (GBP)</option>
                <option>Australian Dollar (AUD)</option>
                <option>Canadian Dollar (CAD)</option>
                <option>Swiss Franc (CHF)</option>
                <option>Chinese Yuan (CNY)</option>
                <option>Swedish Krona (SEK)</option>
                <option>New Zealand Dollar (NZD)</option>
                <option>Singapore Dollar (SGD)</option>
                <option>Hong Kong Dollar (HKD)</option>
                <option>Norwegian Krone (NOK)</option>
                <option>South Korean Won (KRW)</option>
                <option>Turkish Lira (TRY)</option>
                <option>Mexican Peso (MXN)</option>
                <option>Indian Rupee (INR)</option>
                <option>Brazilian Real (BRL)</option>
                <option>Russian Ruble (RUB)</option>
                <option>South African Rand (ZAR)</option>
                <option>Egyptian Pound (EGP)</option>
                <option>Bulgarian Lev (BGN)</option>
                <option>Peruvian Sol (PEN)</option>
              </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Additional Notes:</Form.Label>
              <Form.Control
                name="additionalNotes"
                id="additionalNotes"
                type="text"
                value={destination.additionalNotes}
                onChange={(e) => changeHandler(e, index)}
              />
            </Form.Group>

          </div>
        ))}

        <Button type="submit" variant="primary">
          Update trip
        </Button> {" "}

        <Button type="button" onClick={addDestinationHandler} variant="primary">
          Add more fields
        </Button> {" "}

        <Button type="button" onClick={() => navigate(`/trips/${_id}`)} variant="primary">
          Cancel
        </Button>
      </Form>

    </div>
  );
}

