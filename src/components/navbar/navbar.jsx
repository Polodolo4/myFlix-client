import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import { setMovies, setUser } from '../../actions/actions';

function Menubar ({user}) {

const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

const token = user.token

return (

<Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
    <Container>
    <Navbar.Brand className="navbar-logo" href="/">BrettFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="resposive-navbar-nav" />
        <Navbar.Collapse id="reponsive-navbar-nav">
            <Nav className="ml-auto">
            {!!token && (
                <Nav.Link href={`/users/${user.user.Username}`}>{user.user.Username}</Nav.Link>
                )}
            {!!token && (
                <Button variant="link" onClick={onLoggedOut}>Logout</Button>
            )}
            {!!!token && (
              <Nav.Link href={"/"}>Sign-in</Nav.Link>
            )}
             {!!!token && (
              <Nav.Link href={"/register"}>Sign-up</Nav.Link>
            )}
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
    );
};

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
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (Menubar);