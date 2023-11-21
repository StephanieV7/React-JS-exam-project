import { Button, Form } from 'react-bootstrap';


export default function Login() {
    return (
        <div className='main-container'>
          
            <Form>

                <Form.Group className="mb-3" >
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        name="email"
                        id="email"
                        type="email"
                    // value={formValues.email}
                    // onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        name="password"
                        id="password"
                        type="password"
                    // value={formValues.password}
                    // onChange={changeHandler}
                    />
                </Form.Group>

                <Button type="button" variant="primary">
                    Log in
                </Button>

            </Form>
        </div>
    )
}