import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
  

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    
    return (
      <Container>
          <Row>
              <Col>
                <CardGroup> 
                  <Card>
                    <Card.Img variant='top' src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
                      <Button 
                      size='lg'
                      onClick={() => onClick(movie)} 
                      variant='link'>
                      View
                      </Button>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Col>
          </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = { 
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
   
  }).isRequired,
  onClick: PropTypes.func.isRequired
};