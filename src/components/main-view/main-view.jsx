import React from 'react';
import axios from 'axios';

<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from 'react-router-dom';

=======
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
=======
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
<<<<<<< HEAD
<<<<<<< HEAD

import { Row, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
=======
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
=======
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)


export class MainView extends React.Component {

 constructor(){
    super();
    this.state = {
        movies: [],
        selectedMovie: null,
        registered: null,
        user: null
    }
}

componentDidMount(){
    axios.get('https://brett-flix.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    
    const { movies, selectedMovie, user, registered } = this.state;
   
    if (!registered) return (<RegistrationView onRegister={(register) => this.onRegister(register)}/>);
<<<<<<< HEAD

<<<<<<< HEAD
    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;
=======
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)

    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <Row className="main-view justify-content-md-center">
<<<<<<< HEAD

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

=======
    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
=======
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
>>>>>>> parent of 71e9114 (Merge pull request #1 from Polodolo4/Tasks)
        </Row>
      );
    }
  }
