import React, { useState } from "react";
import "../styles/Categories.css";
import { TextInput, Button } from "@mantine/core";

function NewCategory({ addCategory, setCustom }) {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    addCategory(newCategoryName);
    setCustom(false)
  };

  return (
    <div className="new-category-div" textAlign="center">
      <TextInput
        className="margin-8"
        id="outlined-basic"
        size="xs"
        radius="md"
        placeholder="New Category"
        value={newCategoryName}
        onChange={handleChange}
      />

      <Button
        variant="filled"
        color="teal"
                size="sm"
        radius="xl"
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
