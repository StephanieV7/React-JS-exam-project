import { Button, Form } from 'react-bootstrap';
import { useState } from 'react'
import * as tripService from '../../services/tripService'
import { useNavigate } from 'react-router-dom';
import styles from './AddTripModal.module.css'

const formInitialState = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
}

export default function AddTripModal() {

  const [formValues, setFormValues] = useState(formInitialState);
  const navigate = useNavigate();

  const changeHandler = (e) => {

    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }
  
  let addDestinationHandler = () => {
    setFormValues([...formValues, formInitialState])
  }
  
  const resetFormHandler = () => {
    setFormValues(formInitialState)
  }

  const submitHandler = async () => {
    await tripService.create(formValues);

    navigate('/trips')


  }

  return (
    <div className={styles.mainContainer}>

      <Form onSubmit={submitHandler}>  
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
      {formValues.map((x) => ( <div>
        <Form.Group className="mb-3" >
        <Form.Label>Destination</Form.Label>
        <Form.Control
          name="destination"
          id="destination"
          type="text"
          value={x.destination}
          onChange={changeHandler}
          placeholder="Enter your destination" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start date</Form.Label>
        <Form.Control
          name='startDate'
          id='startDate'
          type="date"
          value={x.startDate}
          onChange={changeHandler} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End date</Form.Label>
        <Form.Control
          name='endDate'
          id='endDate'
          type="date"
          value={x.endDate}
          onChange={changeHandler} />
      </Form.Group>
      </div>

        
      ))}
   



      <Button className={styles.addTripButton} type="submit" variant="primary">
        Add trip
      </Button>
      <Button className={styles.addTripButton} type="button" onClick={addDestinationHandler} variant="primary">
        Add more fields
      </Button>
      <Button className={styles.addTripButton} type="button" onClick={resetFormHandler} variant="primary">
        Reset fields
      </Button>
    </Form>
    </div>
    
  );
}
