import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import UserStore from '../UserStore';

const Login = (props) => {
    const [user, updateUser] = React.useState('');
    const history = useHistory();
    const handleSubmit = (event) => { 
        event.preventDefault();
        localStorage.setItem('isLoggedin', user);
        UserStore.addUser(user)
        history.push('/dashboard');
        
    }
    if (localStorage.getItem('isLoggedin')) {
        return <Redirect to="/dashboard" />
    }
    return (<Container className="align-items-center">
        <Row className="justify-content-md-center">
            <Col xs={12} md={4} sm={12}>
                <div className="padding-top-lg">
                    <h1 className="text-center">Login</h1>
                    <Form   onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="eid">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control  required onChange={e => updateUser(e.target.value)} size="lg" type="text" placeholder="Enter ID"  />
                        </Form.Group>
                        <Button  variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>)
}
export default Login;