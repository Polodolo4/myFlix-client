import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap'; 
import axios from 'axios';

import { setMovies, setUser, setFavorite,} from '../../actions/actions';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './movie-view.scss';

class MovieView extends React.Component {

  constructor() {
    super();
  }

  getUser() {
    const username = this.props.user.user.Username
    const accessToken = this.props.user.token
    axios
      .get(`https://brett-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
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
    console.log(this.props.user)
    this.getUser();
  }

  
    // Add Favorite movie 
    addFavMovie = () => {
      const username = this.props.user.user.Username
      const accessToken = this.props.user.token
      let userFavMovies = this.state.FavoriteMovies;
      let isFav = userFavMovies.includes(this.props.movie._id);
      if (!isFav) {
        axios.post(`https://brett-flix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then((response) => {
            this.setState({
              FavoriteMovies: response.data.FavoriteMovies,
            });
            this.props.setFavorite(response.data);
            console.log(response.data);
            alert(
              `${this.props.movie.Title} has been added to your favorites!`
            );
        //    window.open(`/movies/${this.props.movie._id}`, '_self');
          })
      } else if (isFav) {
        alert(
          `${this.props.movie.Title} is already in your favorites!`
        );
      }
    }
  
    // Delete a movie from Favorite movies 
    removeFavMovie = () => {
      const username = this.props.user.user.Username
      const accessToken = this.props.user.token
      let userFavMovies = this.state.FavoriteMovies;
      let isFav = userFavMovies.includes(this.props.movie._id);
      if (isFav) {
      axios.delete(`https://brett-flix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((response) => {
          this.setState({
            FavoriteMovies: response.data.FavoriteMovies,
          });
          this.props.setFavorite(response.data);
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been removed from your favorites!`
          );
        //  window.open(`/movies/${this.props.movie._id}`, '_self');
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

let mapStateToProps = store => {
  return { 
    movies: store.movies,
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    setMovies: (movies) => {
      dispatch(setMovies(movies))
    },
    setFavorite: (FavoriteMovies) => {
      dispatch(setFavorite(FavoriteMovies))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MovieView);