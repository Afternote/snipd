import React, { useState } from "react";
import { CardActions, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { saveNote } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function NewNote({ onClose, isNewNote }) {
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const handleMakeNote = () => {
    saveNote(noteContent, noteTitle).then(() => {
      onClose();
    });
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <>
      <ArrowBackIcon
        style={{ paddingTop: "8px", paddingBottom: "8px", height: "16px", width: "16px" }}
        onClick={handleBackClick}
      />
      <TextField
        size="small"
        style={{ paddingBottom: "16px" }}
        label="Title"
        fullWidth
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <TextField
        label="Content"
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
