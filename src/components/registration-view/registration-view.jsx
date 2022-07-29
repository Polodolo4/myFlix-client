import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap'; 
import axios from 'axios'; 

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate =() => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq= false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq= false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Enter valid email');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      
    axios.post('https://brett-flix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data =response.data;
      console.log(data);
      window.open('/','_self'); // the second argument "_self" is neccessary so that the page will open in the current tab
    })  
    .catch(e => {
      console.log('error registering the user')
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
              <Card.Title>Please Register...Now!</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    placeholder='Enter your username'
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    placeholder='Enter your password (must be 6 or more characters)'
                    minLength='6'
                  />
                   {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder='Enter your email'
                />
                 {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                  type='date' 
                  value={birthday} 
                  onChange={(e) => setBirthday(e.target.value)}
                  required 
                  />
                </Form.Group>

                <Button 
                  size='lg'
                  variant='primary'
                  type='submit' 
                  onClick={handleSubmit}> 
                  Register 
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

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.number.isRequired,
  }),
};