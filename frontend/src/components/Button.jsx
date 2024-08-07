
import React from 'react';
import { Link } from 'react-router-dom';
const CircularButton = (props) => {
  return (
    <Link to={props.link} >
    <button className="circular-button" id={props.className} >
      {props.name}
    </button>
    </Link>
  );
};

export default CircularButton;
