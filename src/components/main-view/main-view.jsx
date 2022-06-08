import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';


class MainView extends React.Component {

 constructor(){
    super();
    this.state = {
        movies: [],
        selectedMovie: null,
        user: null
    };
}

componentDidMount(){
    axios.get('https://brett-flix.herokuapp.com/movies?apiKey=$')
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

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;
   
    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
          ))
        }
      </div>
    );
  }
  

 /* render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  } */
} 

export default MainView;