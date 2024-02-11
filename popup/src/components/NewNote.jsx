// NewNote.js

import React, { useState } from "react";
import { CardActions, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { saveNote } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";

export function NewNote({ onClose }) {
  const [noteContent, setNoteContent] = useState("");

  const handleMakeNote = () => {
    saveNote(noteContent).then(() => {
      onClose();
    });
  };

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
        <Button className="margin16" onClick={handleMakeNote}>
          Make note
        </Button>
      </CardActions>
    </>
  );
}
