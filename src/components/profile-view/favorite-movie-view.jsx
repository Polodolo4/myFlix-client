import React, { Fragment, useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

export function FavoriteMovieView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);

  const { currentUser, token } = props;

 

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

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://brett-flix.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:username', '_self');
    }).
    catch(error => console.error(error))
  }


  return (
    <Fragment>
      {favoriteMovies.length === 0 ? (
          <p>No favorite movies...add some!</p>
          ) : (
            favoriteMovies.map((movie) => {
              return (
              <Col xs={12} sm={8} md={6} lg={4} >
                <Card>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={`https://brett-flix.herokuapp.com/${movie.ImagePath}`} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button  className="button ml-3"  variant="outline-danger" size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >Remove!</Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </Fragment>
  )
} 