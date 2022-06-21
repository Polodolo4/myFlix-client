import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button} from 'react-bootstrap';  

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(true);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type='text' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          placeholder="Enter your username" 
          />
      </Form.Group>
      
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          placeholder="Enter your password"
          minLength="8"
          />
      </Form.Group>

      <Form.Group>
      <Form.Label>Email:</Form.Label>
        <Form.Control
         type='email' 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         required
         placeholder="Enter your email"
         />
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

      <Button type='submit' 
      onClick={handleSubmit}> Submit 
      </Button>
      
    </Form>
  );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired,
};
