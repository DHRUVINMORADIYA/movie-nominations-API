import { React, useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import "./Home.css";

function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    call(movieTitle);
  }, [movieTitle]);

  const call = (movieTitle) => {
    axios
      .get(`http://www.omdbapi.com/?s=${movieTitle}&apikey=f5f8bd43`)
      .then((Response) => {
        console.log(Response);
        setMovieList(Response.data.Search);
      })
      .catch((error) => console.log(error));
  };

  const addToNominee = (movie) => {
    if (nominations.length >= 5) {
      alert("You have 5 movies nominated!");
      return;
    }
    let match = nominations.filter((item) => item.imdbID === movie.imdbID);
    console.log(match);
    if (match.length === 0) setNominations([...nominations, movie]);
    else alert(`"${movie.Title}" is already added to the nominations!`);
  };

  const showResults = () => {
    const heading = movieTitle ? `Results for "${movieTitle}"` : `Results`;
    return (
      <div className="resultsList">
        <text className="headingText">{heading}</text>
        <ul>
          {movieList &&
            movieList.map((movie) => (
              <div>
                <li>
                  <text className="listText">
                    {movie.Title} ({movie.Year})
                  </text>
                  <Button
                    className="addToNomineeButton"
                    size="small"
                    variant="contained"
                    onClick={() => addToNominee(movie)}
                  >
                    Nominate
                  </Button>
                </li>
              </div>
            ))}
        </ul>
      </div>
    );
  };

  const removeNominee = (movie) => {
    console.log(nominations.length);
    setNominations(nominations.filter((title) => title.Title !== movie.Title));
    console.log(nominations.length);
  };

  const showNominations = () => {
    return (
      <div className="nominationsList" id="nominationsHeader">
        <text className="headingText">Nominations</text>
        <ul>
          {nominations &&
            nominations.map((movie) => (
              <div>
                <li>
                  <text className="listText">
                    {movie.Title} ({movie.Year})
                  </text>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => removeNominee(movie)}
                  >
                    Remove
                  </Button>
                </li>
              </div>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="main">
      <text className="theShoppies">The Shoppies</text>
      <Card className="inputCard">
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </CardContent>
      </Card>
      <div className="results">
        {showResults()}
        <div className="verticalLine"></div>
        {showNominations()}
      </div>
    </div>
  );
}

export default Home;
