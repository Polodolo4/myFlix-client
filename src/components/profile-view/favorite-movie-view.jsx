import React, { Fragment } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

export function FavoriteMoviesView(props) {
  const { movies, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesId = favoriteMovies.map(m => m._id)

  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

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
      {favoriteMoviesList.length === 0 ? (
          <p>No favorite movies...add some!</p>
          ) : (
            favoriteMoviesList.map((movie) => {
              return (
              <Col xs={10} sm={8} md={6} lg={4} >
                <Card>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="button" variant="outline-primary" size="sm">Open</Button>
                    </Link>
                    <Button  className="button ml-2"  variant="outline-primary" size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >Remove</Button>
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