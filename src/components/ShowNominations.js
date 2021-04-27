import React from "react";
import Button from "@material-ui/core/Button";

const ShowNominations = (props) => {
  const removeNominee = (movie) => {
    props.setNominations(
      props.nominations.filter((mv) => mv.imdbID !== movie.imdbID)
    );
  };

  return (
    <div className="nominationsList" id="nominationsHeader">
      <text className="headingText">Nominations</text>
      <ul>
        {props.nominations &&
          props.nominations.map((movie) => (
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
export default ShowNominations;
