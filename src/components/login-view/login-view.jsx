import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';  

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
  
    // validate user inputs
    const validate = () => {
      let isReq = true;
      if (!username) {
        setUsernameErr('Username required');
        isReq= false;
      } else if (username.length < 2) {
        setUsernameErr('Username must be at least 2 characters long');
        isReq = false;
      }
      if (!password) {
        setPasswordErr('Password required');
        isReq = false;
      } else if (password.length < 6) {
        setPasswordErr('Password must be at least 6 characters long');
        isReq = false;
      }
      return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {

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
        }
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
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>

                            <Form.Group controlId='formPassword'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type='password' 
                                    onChange={e => setPassword(e.target.value)} 
                                    required
                                    placeholder='Enter your password'
                                />
                                {passwordErr && <p>{passwordErr}</p>}
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