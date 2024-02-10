import { Card, CardActions, TextField, Typography } from "@mui/material";
import astronautUfo from "../assets/ufo_ast.png";
import { Button } from "@mantine/core";
import { openAllSnipdPage, saveNote } from "../utils/snippitUtils";
import { useState } from "react";

export function EmptySelecion() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100vh",
        }}>
        <center>
          <img style={{ width: "100%", padding: "16px" }} src={astronautUfo} alt="Logo" />
          <Typography
          style={{
            margin: "8px",
            textAlign: "center",
            fontSize: "12px",
          }}
          variant="h6">
          <b>
            To save a snippet, please make a selection. <hr/>
            It appears that no text/image/link has been selected.
          </b>
          <br />
        </Typography>
        </center>

        

        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button style={{ margin: "16px" }} onClick={() => setIsNewNote(true)}>
            Make note
          </Button>

          <Button style={{ margin: "16px" }} onClick={() => openAllSnipdPage()}>
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
        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            style={{ margin: "16px" }}
            onClick={() => {
              saveNote(noteContent).then(() => {
                window.close();
              });
            }}>
            Make note
          </Button>
        </CardActions>
      </>
    );
  };

  return <div>{isNewNote ? <NewNote /> : <NoSelect />}</div>;
}
