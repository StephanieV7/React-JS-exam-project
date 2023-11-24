import { Button, Form } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import styles from './Register.module.css'

const RegisterFormKeys = {
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD: 'password',
    REPEATPASSWORD: 'repeat-password',
}

export default function Register() {
    const {registerSubmitHandler} = useContext(AuthContext)
    const { formValues, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.EMAIL]: '',
        [RegisterFormKeys.USERNAME]: '',
        [RegisterFormKeys.PASSWORD]: '',
        [RegisterFormKeys.REPEATPASSWORD]: '',
    })
    return (
        <div className={styles.mainContainer}>

            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" >
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        name={RegisterFormKeys.EMAIL}
                        id="email"
                        type="email"
                        value={formValues[RegisterFormKeys.EMAIL]}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name={RegisterFormKeys.USERNAME}
                        id="username"
                        type="text"
                        value={formValues[RegisterFormKeys.USERNAME]}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name={RegisterFormKeys.PASSWORD}
                        id='password'
                        type="password"
                        value={formValues[RegisterFormKeys.PASSWORD]}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                        name={RegisterFormKeys.REPEATPASSWORD}
                        id='repeat-password'
                        type="password"
                        value={formValues[RegisterFormKeys.REPEATPASSWORD]}
                        onChange={onChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" value="Register">
                    Register
                </Button>

            </Form>
        </div>
    )
}