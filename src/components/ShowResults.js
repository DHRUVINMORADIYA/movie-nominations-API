import React from "react";
import Button from "@material-ui/core/Button";

const showResults = (props) => {
  const heading = props.movieTitle
    ? `Results for "${props.movieTitle}"`
    : `Results`;

  const addToNominee = (movie) => {
    if (props.nominations.length >= 5) {
      alert("You have 5 movies nominated!");
      return;
    }
    let match = props.nominations.filter(
      (item) => item.imdbID === movie.imdbID
    );
    console.log(match);
    if (match.length === 0) props.setNominations([...props.nominations, movie]);
    else alert(`"${movie.Title}" is already added to the nominations!`);
  };

  return (
    <div className="resultsList">
      <text className="headingText">{heading}</text>
      <ul>
        {props.movieList &&
          props.movieList.map((movie) => (
            <div>
              <li>
                <text className="listText">
                  {movie.Title} ({movie.Year})
                </text>
                <Button
                  disabled={false}
                  className="addToNomineeButton"
                  size="small"
                  variant="contained"
                  onClick={() => {
                    addToNominee(movie);
                  }}
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

export default showResults;
