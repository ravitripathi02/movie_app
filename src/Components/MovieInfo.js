import styled from "styled-components";
import Axios from "axios";

import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const CoverImg = styled.img`
  object-fit: cover;
  margin-top: 30px;
  height: 352px;
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
font-size:18px;
font-weight:600:
color:black;
text-transform: capitalize;
margin :10px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
`;
const MovieInfos = styled.span`
  fonst-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfo = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${props.selectedMovie}&apikey=5550b3a6`
    ).then((response) => setMovieInfo(response.data));
  }, [props.selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImg src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfos>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfos>
            <MovieInfos>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfos>
            <MovieInfos>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfos>
            <MovieInfos>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfos>
            <MovieInfos>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfos>
            <MovieInfos>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfos>
            <MovieInfos>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfos>
            <MovieInfos>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfos>
            <MovieInfos>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfos>
            <MovieInfos>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfos>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfo;
