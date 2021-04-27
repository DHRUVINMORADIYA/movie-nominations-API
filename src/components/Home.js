import { React, useEffect, useState } from "react";
import ShowNominations from "./ShowNominations";
import showResults from "./ShowResults";
import axios from "axios";
import Card from "@material-ui/core/Card";
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
      .get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=f5f8bd43`)
      .then((Response) => {
        console.log(Response);
        setMovieList(Response.data.Search);
      })
      .catch((error) => console.log(error));
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
        {showResults({ movieList, movieTitle, nominations, setNominations })}
        <div className="verticalLine"></div>
        {ShowNominations({ nominations, setNominations })}
      </div>
    </div>
  );
}

export default Home;
