import React from "react";
import styled from "styled-components";

const Img = styled.img`
  object-fit: cover;
  height: 362px;
`;
const Movie = styled.div``;
const MovieContainer = styled.div`
  display: flex;
  backgound-color: red;
  flex-direction: column;
  padding: 10px;
  width: 290px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  justify-content: left;
`;
const MovieName = styled.span`
font-size:18px;
backgrond-color: red;
font-weight:600:
color:black;
margin :15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
`;
const InfoCol = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
font-size:18px;
font-weight:600:
color:black;
text-transform:capitalize;
`;
const FavBtn = styled.button`
  margin: 10px;
  cursor: pointer;
`;
const Div = styled.div`
  z-index: 1;
`;
function MovieList(props) {
  const FavouriteComponent = props.favouriteComponent;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {
        (props.movies.map = (movie, index) => (
          <MovieContainer
            onClick={() => {
              props.onMovieSelect(movie.imdbID);
              scrollToTop();
            }}
          >
            <Img src={movie.Poster} />
            <MovieName>{movie.Title}</MovieName>
            <InfoCol>
              <MovieInfo>Year: {movie.Year}</MovieInfo>
              <MovieInfo>Type: {movie.Type}</MovieInfo>
            </InfoCol>
            <Div onClick={() => props.handleFavouritesClick(movie)}>
              <FavouriteComponent />
            </Div>
          </MovieContainer>
        ))
      }
    </>
  );
}

export default MovieList;
