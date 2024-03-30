import React from "react";
import "../styles/Notes.css";

const ImageCard = (props) => {
  return <img style={{marginTop:'16px'}} className="selected-image" src={props.content} alt="selected image" />;
};

export default ImageCard;
