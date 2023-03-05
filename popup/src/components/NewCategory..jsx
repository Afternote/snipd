import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function NewCategory({ addCategory }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const handleClick = (newCategory) => {
    addCategory(newCategory);
  };
  return (
    <div
      style={{
        alignItems: "center",
        alignContent: "center",
        display: "flex",
      }}>
      <center>
        <TextField
          style={{
            margin: "8px",
          }}
          id="Outlined-basic"
          label="New Category"
          variant="outlined"
          onChange={(event) => {
            event.target.focus();
            setNewCategoryName(event.target.value)
        }}
        />

        <Button
          style={{ margin: "8px", justifyContent: "center" }}
          variant="contained"
          onClick={() => handleClick(newCategoryName)}>
          Add
        </Button>
      </center>
    </div>
  );
}

export default NewCategory;
