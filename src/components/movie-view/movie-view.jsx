import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap'; 

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
                      <Button 
                      size='lg'
                      type='submit'
                      onClick={() => onBackClick(null)} 
                      variant="link">
                      Go Back!
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