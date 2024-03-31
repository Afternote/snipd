import React, { useState } from "react";
import { Button, Textarea } from "@mantine/core";
import XIcon from "../assets/icons/XIcon";
import { ActionIcon } from "@mantine/core";
import { validateCustomNote } from "../utils/snippitUtils";
import { Notification } from "@mantine/core";
import { ERROR_MESSAGES } from "../utils/errorMessages";
const CustomNoteInputCard = (props) => {
  const [value, setValue] = useState("");

  const handleAddCustomNoteClick = () => {
    if (validateCustomNote(value)) {
      props.setErrorFlag(true)
      props.setErrorMessage(ERROR_MESSAGES.EMPTY_CUSTOM_NOTE)
    } else {
      props.setCustomNotes([...props.customNotes, value]);
      props.setCustomNoteFlag(false);
    }
  };

  const handleCloseIconClick = () => {
    props.setCustomNoteFlag(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
      
      <div style={{ margin: "4px", display: "flex", justifyContent: "end" }}>
        <ActionIcon
          onClick={handleCloseIconClick}
          variant="subtle"
          radius="xl"
          aria-label="Settings">
          <XIcon />
        </ActionIcon>
      </div>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Add Your Note"
        autosize
        minRows={2}
        maxRows={4}
      />
      <Button onClick={handleAddCustomNoteClick} style={{ marginTop: "8px" }} variant="light">
        Add
      </Button>
    </div>
  );
};

export default CustomNoteInputCard;
