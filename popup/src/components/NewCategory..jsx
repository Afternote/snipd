import React, { useState } from "react";
import "../styles/Categories.css";
import { TextInput, Button, Text } from "@mantine/core";

function NewCategory({ addCategory, setCustom, setCategoryAdded }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const maxLength = 15;
  const remainingChars = maxLength - (newCategoryName?.length || 0);

  const handleChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    addCategory(newCategoryName);
    setCategoryAdded(newCategoryName);

    setCustom(false);
  };

  return (
    <div className="new-category-div" textAlign="center">
      <div style={{width:'100%'}}>
        <TextInput
          maxLength={maxLength}
          id="outlined-basic"
          size="sm"
          radius="md"
          placeholder="New Category"
          value={newCategoryName}
          onChange={handleChange}
        />
        <div style={{display:'flex', justifyContent:'right', marginRight:'16px'}}>
          {remainingChars == 0 && (
            <Text>
              {remainingChars}/{maxLength}
            </Text>
          )}
        </div>
      </div>
      <Button
        variant="filled"
        color="teal"
        size="sm"
        radius="xl"
        className="add-category-button"
        onClick={handleAddCategory}
        disabled={!newCategoryName.trim()}>
        Add
      </Button>
    </div>
  );
}

export default NewCategory;
