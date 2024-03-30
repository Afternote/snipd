import React from "react";
import { Badge } from "@mantine/core";
import "../../styles/Notes.css";

const BadgeContainer = (props) => {
  return (
    <div className="badges-container">
      <Badge className="badge" variant="light" color="rgba(73, 152, 201, 1)">
        {props.truncatedTitle}
      </Badge>
      <Badge className="badge" variant="light" color="gray">
        {props.formattedDate} {props.formattedTime}
      </Badge>
    </div>
  );
};

export default BadgeContainer;
