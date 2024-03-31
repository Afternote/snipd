import React, { useState } from "react";
import { Card, Title, Text, Button } from "@mantine/core";
import CustomNoteInputCard from "./CustomNoteInputCard";

const AddCustomNoteCard = (props) => {
  const [customNoteFlag, setCustomNoteFlag] = useState(false);
  const styles = {
    card: {
      border: "2px dashed #006cff",
      padding: 20,
      borderRadius: 5,
      margin: "16px",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  };

  const handleAddNoteOnClick = () => {
    setCustomNoteFlag(true);
  };

  return (
    <div>
      {customNoteFlag ? (
        <CustomNoteInputCard
          setErrorFlag={props.setErrorFlag}
          setErrorMessage={props.setErrorMessage}
          setCustomNoteFlag={setCustomNoteFlag}
          customNotes={props.customNotes}
          setCustomNotes={props.setCustomNotes}
        />
      ) : (
        <Card p="md" radius="md" style={styles.card}>
          <Button variant="transparent" onClick={handleAddNoteOnClick}>
            Add a custom Note
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AddCustomNoteCard;
