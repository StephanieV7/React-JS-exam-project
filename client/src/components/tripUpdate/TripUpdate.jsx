import { Button, Form } from 'react-bootstrap';
import { useState } from 'react'
import * as tripService from '../../services/tripService'
import { useNavigate } from 'react-router-dom';

const formInitialState = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
}

export default function AddMoreDetails () {

  const [formValues, setFormValues] = useState(formInitialState);
  const navigate = useNavigate();

  const changeHandler = (e) => {

    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }


  
  const resetFormHandler = () => {
    setFormValues(formInitialState)
  }

  const submitHandler = async () => {
    await tripService.create(formValues);

    navigate('/trips')


  }

  return (
    <div className='main-container'>

      <Form>

      <Form.Group className="mb-3" >
        <Form.Label>Accomodation</Form.Label>
        <Form.Control
          name="title"
          id="title"
          type="text"
          value={formValues.accomodation}
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

      <Button type="button" onClick={submitHandler} variant="primary">
        Add trip
      </Button>
      <Button type="button" onClick={resetFormHandler} variant="primary">
        Reset fields
      </Button>
    </Form>
    </div>
    
  );
}

//Google maps API key: AIzaSyCKj6A1eMblGKGy3IsV2ZbElFfNTZZJePA