import styles from './AddArticle.module.css';
import {useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import * as blogService from '../../services/blogService';

export default function AddArticle() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        headline: "",
        body: ""
    });

    const onChangeHandler = (e) => {
        setFormValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await blogService.createArticle(formValues);
        navigate('/blog')

     
        setFormValues({
            headline: "",
            body: ""
        });
    };

    return (<div className={styles.addArticle}>

        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Article Headline</Form.Label>
                <Form.Control type="text" name='headline' value={formValues.headline} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Article Body</Form.Label>
                <Form.Control as="textarea" name='body' value={formValues.body} onChange={onChangeHandler} style={{ height: '400px'}} />
            </Form.Group>
            <Button variant="primary" type='submit' style={{ marginLeft: '10px' }}>Upload</Button>
          
        </Form>
        
        </div>)
}

