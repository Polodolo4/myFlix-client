import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap'; 
import axios from 'axios';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
  }

  getUser(token) {
    let user = localStorage.getItem('user');
    axios
      .get(`https://brett-flix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  
    // Add Favorite movie 
    addFavMovie = () => {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');
      let userFavMovies = this.state.FavoriteMovies;
      let isFav = userFavMovies.includes(this.props.movie._id);
      if (!isFav) {
        axios.post(`https://brett-flix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            console.log(response.data);
            alert(
              `${this.props.movie.Title} has been added to your favorites!`
            );
            window.open(`/movies/${this.props.movie._id}`, '_self');
          })
      } else if (isFav) {
        alert(
          `${this.props.movie.Title} is already in your favorites!`
        );
      }
    }
  
    // Delete a movie from Favorite movies 
    removeFavMovie = () => {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');
      let userFavMovies = this.state.FavoriteMovies;
      let isFav = userFavMovies.includes(this.props.movie._id);
      if (isFav) {
      axios.delete(`https://brett-flix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been removed from your favorites!`
          );
          window.open(`/movies/${this.props.movie._id}`, '_self');
        })
      } else if (!isFav) {
        alert(
          `${this.props.movie.Title} isn't in your favorites!`
        );
      }
    }

    render() {
      const { movie, onBackClick } = this.props;   

    return (
        <Container>
          <Row>
              <Col>
                <CardGroup> 
                  <Card>
                    <Card.Img className="poster-img" variant="top" src={`https://brett-flix.herokuapp.com/${movie.ImagePath}`} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant='link' sz='lg'>Director</Button>
                      </Link>
                      <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant='link' sz='lg'>Genre</Button>
                      </Link> 
                        <Button variant="outline-success" onClick={this.addFavMovie}>Add to favorites!</Button>
                        <Button variant="outline-danger" onClick={this.removeFavMovie}>Remove!</Button>
                      <Button onClick={() => { onBackClick(null); }} variant='danger'>Back</Button>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Col>
          </Row>
      </Container>
    );
  }
}