import { Button, Form } from 'react-bootstrap';

export default function Register() {
    return (
        <div className='main-container'>
          
            <Form>

                <Form.Group className="mb-3" >
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        name="email"
                        id="email"
                        type="email"
                    // value={formValues.email}
                    // onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        id="username"
                        type="text"
                    // value={formValues.username}
                    // onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='password'
                        id='password'
                        type="password"
                    // value={formValues.password}
                    // onChange={changeHandler} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                        name='repeat-password'
                        id='repeat-password'
                        type="repeat-password"
                    // value={formValues.repeat-password}
                    // onChange={changeHandler} 
                    />
                </Form.Group>

                <Button type="button" variant="primary">
                    Add trip
                </Button>

            </Form>
        </div>
    )
}