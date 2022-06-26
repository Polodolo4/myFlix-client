import React from 'react';
import axios from 'axios';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
        </Row>
      );
    }
  }
