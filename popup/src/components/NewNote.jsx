import React, { useState } from "react";
import { CardActions, TextField } from "@mui/material";
import { ActionIcon, Button } from "@mantine/core";
import { saveNote } from "../utils/snippitUtils";
import "../styles/EmptySelection.css";
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon";
import { TextInput } from "@mantine/core";
import { Textarea } from "@mantine/core";

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
    <div>
      <div style={{margin:'8px'}}>
        <ActionIcon onClick={handleBackClick}>
          <ArrowLeftIcon />
        </ActionIcon>
      </div>

      <div style={{ margin: "16px" }}>
        <TextInput
          label="Title"
          withAsterisk
          placeholder="a title for your note"
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <Textarea
          style={{ marginTop: "16px" }}
          size="md"
          label="Note"
          withAsterisk
          placeholder="Your Note"
          onChange={(e) => setNoteContent(e.target.value)}
          autosize
          minRows={2}
          maxRows={4}
        />

        <CardActions className="cardActions">
          <Button
            className="margin16"
            style={{ marginTop: "8px" }}
            variant="light"
            onClick={handleMakeNote}>
            Make note
          </Button>
        </CardActions>
      </div>
    </div>
  );
}
