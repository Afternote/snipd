import { Card, CardActions, TextField, Typography } from "@mui/material";
import astronautUfo from "../assets/ufo_ast.png";
import { Button } from "@mantine/core";
import { openAllSnipdPage, saveNote } from "../utils/snippitUtils";
import { useState } from "react";
import "../styles/EmptySelection.css";

export function EmptySelection() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
    return (
      <div className="emptySelectionDiv">
        <center>
          <img className="astronautUfoImage" src={astronautUfo} alt="Logo" />
          <Typography
            className="margin16"
            variant="h6"
          >
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

  const NewNote = () => {
    const [noteContent, setNoteContent] = useState("");
    return (
      <>
        <TextField
          label="Note content"
          variant="outlined"
          multiline={true}
          rows={8}
          fullWidth
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <CardActions className="cardActions">
          <Button
            className="margin16"
            onClick={() => {
              saveNote(noteContent).then(() => {
                window.close();
              });
            }}
          >
            Make note
          </Button>
        </CardActions>
      </>
    );
  };

  return <div>{isNewNote ? <NewNote /> : <NoSelect />}</div>;
}