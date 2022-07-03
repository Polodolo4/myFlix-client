import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap'; 

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <Container>
          <Row>
              <Col>
                <CardGroup> 
                  <Card>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant='link'>Director</Button>
                      </Link>

                      <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant='link'>Genre</Button>
                      </Link>
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