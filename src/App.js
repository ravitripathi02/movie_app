import { useState, useEffect, useRef } from "react";
import MovieList from "./Components/MovieList";
import styled from "styled-components";
import AddFavourites from "./Components/AddFav";
import MovieInfo from "./Components/MovieInfo";
import RemoveFav from "./Components/RemoveFav";
import Img1 from "./images.png";
const Header = styled.div`
  display: flex;
  width: max-width;
  justify-content: space-between;
  flex-direction: row;
  background-color: black;
  color: white;
  padding: 10px;
`;
const AppName = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`;
const SearchInput = styled.input`
  placeholder: "Search";
  width: 100%;
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 15px;
`;
const List = styled.div`
  background-color: beige;
`;
const Movielist = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  padding: 100px;
  gap: 24px;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const FavName = styled.div`
  font-size: 25px;
  padding: 20px;
`;
const FavList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  font-weight: bold;
  justify-content: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Sad = styled.div`
  display: flex;
  padding-top: 10px;
`;
const Img = styled.image``;
const FavBtn = styled.button`
  padding: 10px;

  marging-right: 20px;
`;
const Mov = styled.div``;
function App() {
  const scollToRef = useRef();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [favourites, setfavourites] = useState([]);
  const [timeOutId, updateTimeoutId] = useState();
  const [searchValue, setSearcValue] = useState("");
  const getMovieReq = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=5550b3a6`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  const addFavouriteMovie = (movie) => {
	   console.log(movie);
    if (favourites.indexOf(movie) == -1) {
      const newFavouriteList = [...favourites, movie];
      setfavourites(newFavouriteList);
      saveTolocalStorage(newFavouriteList);
    } else {
      setfavourites(favourites);
      saveTolocalStorage(favourites);
    }
  };
  const removeFavMovie = (movie) => {
    const newFav = favourites.filter(
      (favourite) => favourite.imdbID != movie.imdbID
    );
    setfavourites(newFav);
    saveTolocalStorage(newFav);
  };
  useEffect(() => {
    getMovieReq(searchValue);
  }, [searchValue]);
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("fav"));
    setfavourites(movieFavourites);
  }, []);

  const saveTolocalStorage = (items) => {
    localStorage.setItem("fav", JSON.stringify(items));
  };
  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    setSearcValue(event.target.value);
    setTimeout(() => getMovieReq(event.target.value), 2000);
    updateTimeoutId(timeOutId);
  };

  return (
    <>
      <Container>
        <Header>
          <AppName>Movie App</AppName>
          <SearchBox>
            <SearchInput
              placeholder="Search for your movie...."
              value={searchValue}
              onChange={onTextChange}
            />
          </SearchBox>
          <FavBtn onClick={() => scollToRef.current.scrollIntoView()}>
            Favourite
          </FavBtn>
        </Header>
        <Mov>
          {selectedMovie && (
            <MovieInfo
              selectedMovie={selectedMovie}
              onMovieSelect={onMovieSelect}
              handleFavouritesClick={addFavouriteMovie}
            />
          )}
        </Mov>
        {movies?.length > 0 && (
          <List>
            <Movielist>
              <MovieList
                movies={movies}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={AddFavourites}
                onMovieSelect={onMovieSelect}
              />
            </Movielist>
          </List>
        )}
        <FavList ref={scollToRef}>
          <FavName>Favourites</FavName>
          {favourites?.length > 0 ? (
            <Movielist>
              <MovieList
                movies={favourites}
                handleFavouritesClick={removeFavMovie}
                favouriteComponent={RemoveFav}
              />
            </Movielist>
          ) : (
            <Div>
              <img src={Img1} alt="one" />
              <Sad>Nothing in favourite</Sad>
            </Div>
          )}
        </FavList>
      </Container>
    </>
  );
}

export default App;
