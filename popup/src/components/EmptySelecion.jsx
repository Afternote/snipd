import { Card, CardActions, TextField, Typography } from "@mui/material";
import confused from "../assets/confused.png";
import { Button } from "@mui/material";
import { openAllSnipdPage, saveNote } from "../utils/snippitUtils";
import { useState } from "react";

export function EmptySelecion() {
  const [isNewNote, setIsNewNote] = useState(false);

  const NoSelect = () => {
      return (
          <div>
            <center>
              <img
                style={{ width: "150px", height: "150px", paddingTop: "16px" }}
                src={confused}
                alt="Logo"
              />
            </center>
            <Typography
              style={{
                margin: "16px",
                fontSize: "15px",
                textAlign: "center",
              }}
              variant="body2">
              Umm... Feels like you didn't select anything!! ☹️
              <br />
              <br />
              Try selecting the text you want to Highlight
              <br />
            </Typography>

            <CardActions style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
              <Button style={{ margin: "16px" }} variant="outlined" onClick={() => setIsNewNote(true)}>
                Make note
              </Button>

              <Button style={{ margin: "16px" }} variant="outlined" onClick={() => openAllSnipdPage()}>
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
          <TextField label="Note content" variant="outlined" multiline={true} rows={8} fullWidth onChange={e => setNoteContent(e.target.value)} />
          <CardActions style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          }}>
            <Button style={{ margin: "16px" }} variant="outlined" onClick={() => {
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

  return (
    <div>
      { isNewNote ? <NewNote /> : <NoSelect /> }
    </div>
  );
}
