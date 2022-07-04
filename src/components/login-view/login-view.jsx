import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';  

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
        axios.post('https://brett-flix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
=======
        console.log(username, password);
        props.onLoggedIn(username);
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
=======
        console.log(username, password);
        props.onLoggedIn(username);
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
    };

    return (
        <Container>
            <Row>
                <Col>
                <CardGroup> 
                    <Card>
                        <Card.Body>
                        <Card.Title>Please Login...Now!</Card.Title>
                        <Form>
                            <Form.Group controlId='formUsername'>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    placeholder='Enter your username'
                                    />
                            </Form.Group>

                            <Form.Group controlId='formPassword'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type='password' 
                                    onChange={e => setPassword(e.target.value)} 
                                    required
                                    placeholder='Enter your password'
                                    />
                            </Form.Group>

                            <Button 
                                size='lg'
                                variant='primary' 
                                type='submit' 
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };