import React, {useState} from "react";
import { Button, Textarea } from "@mantine/core";

const CustomNoteInputCard = (props) => {
  const [value, setValue] = useState('');

  const handleAddCustomNoteClick = () => {
    props.setCustomNotes([...props.customNotes, value])
    props.setCustomNoteFlag(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
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
