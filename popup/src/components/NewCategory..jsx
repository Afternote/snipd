import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import "../styles/Categories.css";

function NewCategory({ addCategory }) {

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    addCategory(newCategoryName);
  };

  return (
    <div className="new-category-div" textAlign="center">
      <TextField
        className="margin-8"
        id="outlined-basic"
        label="New Category"
        variant="outlined"
        value={newCategoryName}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        className="add-category-button"
        onClick={handleAddCategory}
        disabled={!newCategoryName.trim()} // Disable button if the category name is empty or only contains whitespace
      >
        Add
      </Button>
    </div>
  );
}

export default NewCategory;
