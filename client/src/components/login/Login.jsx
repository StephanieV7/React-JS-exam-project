import { Button, Form } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';

const LoginFormKeys = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

export default function Login() {
    const {loginSubmitHandler} = useContext(AuthContext);
    const {formValues, onChange, onSubmit} = useForm(loginSubmitHandler, {
        [LoginFormKeys.EMAIL]: '',
        [LoginFormKeys.PASSWORD]: '',
    });


    return (
        <div className='main-container'>

            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" >
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        name={LoginFormKeys.EMAIL}
                        id="email"
                        type="email"
                        value={formValues[LoginFormKeys.EMAIL]}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        name={LoginFormKeys.PASSWORD}
                        id="password"
                        type="password"
                        value={formValues[LoginFormKeys.PASSWORD]}
                        onChange={onChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" value="login">
                    Log in
                </Button>

            </Form>
        </div>
    )
}