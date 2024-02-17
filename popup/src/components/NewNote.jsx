import React, { useState } from "react";
import { Button, Textarea } from "@mantine/core";

import { saveNote } from "../utils/snippitUtils";

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
      <Button m={16} onClick={handleMakeNote}>
        Make note
      </Button>
    </>
  );
}
