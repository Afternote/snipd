import React, { useState } from "react";
import { Card, CardActions, Typography } from "@mui/material";
import astronautUfo from "../assets/ufo_ast.png";
import { Button } from "@mantine/core";
import { openAllSnipdPage } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import { NewNote } from "./NewNote";

export function EmptySelection() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
    return (
      <div className="emptySelectionDiv">
        <center>
          <img className="astronautUfoImage" src={astronautUfo} alt="Logo" />
          <Typography className="margin16" variant="h6">
            <b>
              To save a snippet, please make a selection. <hr />
              It appears that no text/image/link has been selected.
            </b>
            <br />
          </Typography>
        </center>

        <CardActions className="cardActions">
          <Button className="margin16" onClick={() => setIsNewNote(true)}>
            Make note
          </Button>

          <Button className="margin16" onClick={() => openAllSnipdPage()}>
            Central Page
          </Button>
        </CardActions>
      </div>
    );
  };

  return <div>{isNewNote ? <NewNote onClose={() => setIsNewNote(false)} /> : <NoSelect />}</div>;
}
