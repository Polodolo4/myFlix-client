import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col } from 'react-bootstrap';
import  Menubar  from '../navbar/navbar';


class MainView extends React.Component {

 constructor(){
    super();

    this.state = {
      //  user: null
    };
}

/*componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      /*this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.props.setUser(localStorage.getItem('user'));
    }
}*/

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
  /*  console.log(authData);
    this.setState({
      user: authData.user.Username
    });*/

    //localStorage.setItem('token', authData.token);
    //localStorage.setItem('user', authData.user.Username);
    const { setUser } = this.props;
    setUser(authData);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://brett-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }


  render() {
  
    let { user, movies } = this.props;
 

    return (
      <Router>
        <Menubar/>
        <Row className="main-view justify-content-md-center">

        <Route exact path="/" render={() => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view"></div>

          return <MoviesList movies={movies}/>; 
        }}/>

         

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
             if (!user) return <Col>
             <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
             if (!user) return <Col>
             <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md ={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
        } />

        <Route path="/directors/:name" render={({ match, history }) => {
           if (!user) return <Col>
           <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
         </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md ={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
        } />

{user?.user?.Username && <Route path={`/users/${user?.user?.Username}`} render={({ history }) => {
             if (!user) return <Col>
             <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
       //     if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <ProfileView user={user} history={history} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} /> }

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = props => {
  return { 
    movies: props.movies,
    user: props.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    setMovies: (movies) => {
      dispatch(setMovies(movies))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MainView);