import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className='main-view' />

  //NOTE! onBackClick may not work here - if not, try using it in MainView in the MoviesList route.
  return <>
    <Col md={12} style={{ margin: '2em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>

    {filteredMovies.map(m => (
      <Col xs={12} sm={6} md={3} key={movies._id}>
        <MovieCard movie={m} onBackClick={this.setSelectedMovie} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);