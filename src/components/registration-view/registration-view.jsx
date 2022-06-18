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
    <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter a username" />
    </Form.Group>
      
      <label>
        Password:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </label>
      <button type='submit' onClick={handleSubmit}> Submit </button>
    </Form>
  );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired,
};
