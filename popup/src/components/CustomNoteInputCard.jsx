import React from "react";
import { Button, Textarea } from "@mantine/core";

const CustomNoteInputCard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "16px" }}>
      <Textarea placeholder="Add Your Note" autosize minRows={2} maxRows={4} />
      <Button style={{ marginTop: "8px" }} variant="light">
        Add
      </Button>
    </div>
  );
};

export default CustomNoteInputCard;
