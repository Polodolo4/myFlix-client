import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Row, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';


export class MainView extends React.Component {

 constructor(){
    super();

    this.state = {
        movies: [],
        user: null
    }
}

componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
}

setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegister(registered) {
    this.setState({
      registered
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://brett-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Navbar user={user}/>
        <Row className="main-view justify-content-md-center">

          <Route path="/login" render={() => {
            if (user) return <Redirect to="/" />
            return <Col md={8}>
              <LoginView />
            </Col>
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md ={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
        } />

        <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md ={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
        } />

        <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <ProfileView user={user} history={history} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}