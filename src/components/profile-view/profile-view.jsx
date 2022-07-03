import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { FavoriteMoviesView } from './favorite-movie-view';
import { UpdateView } from './update-view';
import { UserInfo } from './user-info';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://brett-flix.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavoriteMovies(response.data.FavoriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleDelete = () => {
    axios.delete(`https://brett-flix.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The account ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Container>
      <Row>
        <Col>
          <UserInfo name={user.Username} password={user.Password} email={user.Email} birthday={user.Birthday} />
        </Col>
        <Col>
          <UpdateView user={user}/>
        </Col>
      </Row>
      
  
        <Row className="mt-5"><h4>Your favorite movies</h4></Row>
        <Row className="mt-3">
      <FavoriteMoviesView 
          movies={movies} 
          favoriteMovies={favoriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}