import React, { useState } from "react";
import { CardActions, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { saveNote } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function NewNote({ onClose, isNewNote }) {
  const [noteContent, setNoteContent] = useState("");

  const handleMakeNote = () => {
    saveNote(noteContent).then(() => {
      onClose();
    });
  };

  const handleBackClick = () => {
    onClose()
  }

  return (
    <>
    <ArrowBackIcon style={{ paddingTop:"8px", paddingBottom:"8px", height:"16px", width:"16px"}} onClick={handleBackClick}/>
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
