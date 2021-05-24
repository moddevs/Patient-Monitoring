import React from "react";

import "./ListDisplay.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
//Display component for history and findings and treatment and medicine array elements for functionality of delete array element to pass id
function ListDisplay(props) {
  function handleClick() {
    props.onDelete(props.did);
  }

  return (
    <div className="listDisplay">
      <li>{props.element}</li>

      {props.did === props.length - 1 ? (
        <HighlightOffIcon className="cross__icon" onClick={handleClick} />
      ) : (
        ""
      )}
    </div>
  );
}

export default ListDisplay;
