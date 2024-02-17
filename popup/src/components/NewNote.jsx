import React, { useState } from "react";
import { Button, Textarea } from "@mantine/core";

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
      <Textarea
        label="Note content"
        minRows={4}
        maxRows={10}
        autosize
        withAsterisk
        fullWidth
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <Button className="margin16" onClick={handleMakeNote}>
        Make note
      </Button>
    </>
  );
}
